/**
 * Interactive 3D viewer for Gaussian splats (.spz .ply .splat .ksplat .sog) and meshes (.glb).
 * Nothing heavy loads until the visitor asks: three.js and the model are fetched on click.
 */
class XViewer3D extends HTMLElement {
  private dispose?: () => void;

  connectedCallback() {
    this.querySelector('[data-load]')?.addEventListener('click', () => this.start(), { once: true });
    this.querySelector('[data-reset]')?.addEventListener('click', () => this.dispatchEvent(new Event('reset-view')));
    this.querySelector('[data-full]')?.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else this.requestFullscreen();
    });
  }

  private status(text: string) {
    const el = this.querySelector('[data-status]');
    if (el) el.textContent = text;
  }

  private async start() {
    const src = this.getAttribute('src') ?? '';
    const stage = this.querySelector<HTMLElement>('[data-canvas]');
    if (!stage) return;
    this.setAttribute('state', 'loading');
    this.status('LOADING');
    try {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      stage.append(renderer.domElement);

      const size = Math.max(0.1, Number(this.getAttribute('distance') ?? 2.5));
      const home = new THREE.Vector3(size * 0.55, size * 0.25, size);
      camera.position.copy(home);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      renderer.domElement.addEventListener('pointerdown', () => (controls.autoRotate = false));
      this.addEventListener('reset-view', () => {
        camera.position.copy(home);
        controls.target.set(0, 0, 0);
      });

      if (/\.glb$/i.test(src)) {
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        const gltf = await new GLTFLoader().loadAsync(src);
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const scale = 2 / box.getSize(new THREE.Vector3()).length();
        gltf.scene.scale.setScalar(scale);
        gltf.scene.position.copy(box.getCenter(new THREE.Vector3())).multiplyScalar(-scale);
        scene.add(gltf.scene, new THREE.HemisphereLight(0xffffff, 0x222222, 2.4));
        const key = new THREE.DirectionalLight(0xffffff, 2.6);
        key.position.set(3, 4, 2);
        scene.add(key);
      } else {
        const { SparkRenderer, SplatMesh } = await import('@sparkjsdev/spark');
        scene.add(new SparkRenderer({ renderer }));
        const splat = new SplatMesh({ url: src });
        await splat.initialized;
        // COLMAP-derived splats are usually Y-down; set flip="false" if a model appears upside down.
        if (this.getAttribute('flip') !== 'false') splat.quaternion.set(1, 0, 0, 0);
        scene.add(splat);
        // Scans come in COLMAP coordinates, so centre the model and scale it to a known size.
        const box = splat.getBoundingBox(true).applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(splat.quaternion));
        const length = box.getSize(new THREE.Vector3()).length();
        if (length > 0) {
          const scale = 2 / length;
          splat.scale.setScalar(scale);
          splat.position.copy(box.getCenter(new THREE.Vector3())).multiplyScalar(-scale);
        }
      }

      const fit = () => {
        const { width, height } = stage.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const resize = new ResizeObserver(fit);
      resize.observe(stage);
      fit();

      let visible = true;
      const seen = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      seen.observe(this);
      renderer.setAnimationLoop(() => {
        if (!visible) return;
        controls.update();
        renderer.render(scene, camera);
      });
      this.setAttribute('state', 'ready');
      this.status('LIVE / DRAG TO ORBIT / SCROLL TO ZOOM');
      this.dispose = () => {
        renderer.setAnimationLoop(null);
        resize.disconnect();
        seen.disconnect();
        renderer.dispose();
      };
    } catch (err) {
      console.error(err);
      this.setAttribute('state', 'error');
      this.status('COULD NOT LOAD THE MODEL');
    }
  }

  disconnectedCallback() {
    this.dispose?.();
  }
}
customElements.define('x-viewer3d', XViewer3D);
