# Producing the media

The recipes for each interactive element. Tool flags change between versions, so check `--help` if a command complains.

## Size targets

| Type | Target |
|---|---|
| Photos, renders | Up to 2400 px wide, JPG or PNG. The build converts and resizes them |
| Looping video | 1920 px wide, H.264, up to about 15 MB and 30 s |
| Scroll frames | About 120 frames, 1920 px, WebP, under 80 KB each |
| Splats | Under 30 MB per scan |

## CAD to real, camera matched (`DesignToReality`)

The goal is two clips, identical in length and framing, so the divider reveals the same machine in the same pose.

Your robot has a real advantage here: its motion is commanded, so the render can run the **same trajectory** as the footage. You don't have to track anything.

1. **Write one motion program** with the firmware: a short sequence on all three axes, ideally something that loops back to its start. Log the commanded positions at 20 Hz using the telemetry you already have.
2. **Film it** on a locked tripod with manual exposure and white balance, and with the focal length noted. Clean the machine first. Use a dark background, and leave room around the machine.
3. **Bring the CAD into Blender:** export the SolidWorks assembly by axis, so each moving group is a separate object, then parent them in the same order as the real kinematic chain.
4. **Match the camera** on a still from the footage. Either use [fSpy](https://fspy.io), or Blender's own camera solver, or your own ArUco solver for the camera pose. Set sensor size and focal length to the real values, then refine by eye with the photo as a camera background.
5. **Drive the rig from the telemetry log** with a small Blender Python script: one keyframe per sample, converted through your calibrated scales.
6. **Render** at the same resolution and frame rate as the footage. Try a clean clay or line look against a dark background: it reads as "design" and cuts well against the real thing.
7. **Line up the start frame** of both clips, trim them to the same length, and encode them:

```
ffmpeg -i render.mov -an -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -vf "scale=1920:-2" public/media/robot/d2r-render.mp4
ffmpeg -i real.mov   -an -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -vf "scale=1920:-2" public/media/robot/d2r-real.mp4
```

The same recipe suits any machine, including the dispenser.

## PCB exploded view (`ScrollExplode`)

Vector exports stay sharp at any zoom. From the KiCad project:

```
kicad-cli pcb export svg --layers F.Cu  --black-and-white --exclude-drawing-sheet --page-size-mode 2 -o public/media/flash/l1.svg  board.kicad_pcb
kicad-cli pcb export svg --layers In1.Cu --black-and-white --exclude-drawing-sheet --page-size-mode 2 -o public/media/flash/l2.svg board.kicad_pcb
kicad-cli pcb export svg --layers In2.Cu --black-and-white --exclude-drawing-sheet --page-size-mode 2 -o public/media/flash/l3.svg board.kicad_pcb
kicad-cli pcb export svg --layers B.Cu  --black-and-white --exclude-drawing-sheet --page-size-mode 2 -o public/media/flash/l4.svg  board.kicad_pcb
```

For the finished board, use a top-down render or photo of the real PCB with its background removed, cropped to the board outline. It must be the same size and framing as the layers: `flash/board.png`.

Then, in `src/content/work/smart-flash.mdx`:

1. Update the paths, and remove `standin`.
2. Add `invert`, because the exports are black copper on a transparent background and the stage is black.
3. Replace the notes with what each layer really carries.
4. If your export has a white background, remove it first, or the planes will hide each other.
5. Change the stack's `aspect-ratio` in `ScrollExplode.astro` to match your board (it's currently 8/5).

## Rendered exploded assembly (`ScrollSequence`)

For solid 3D parts. In Blender, animate the explosion and render about 120 frames:

```
ffmpeg -i frames/%04d.png -vf "scale=1920:-2" -c:v libwebp -quality 78 -f image2 public/media/robot/explode/%04d.webp
```

Names must be `0001.webp`, `0002.webp`, and so on, and `count` in the MDX must match. Render with the same background as the chapter so the frame edges disappear.

## Gaussian splats (`Viewer3D`, `ScanExplorer`)

Spark reads `.sog`, `.spz`, `.ply`, `.splat` and `.ksplat`. Raw `.ply` files are huge, so compress them:

```
npx @playcanvas/splat-transform input.ply public/media/robot/splats/peppercorn.sog
```

Save to the path listed in `src/data/scans.ts` and the **Splat** button unlocks for that sample. Any format works if you update the path.

- **Clean first:** remove floaters and the sample's support pin if it distracts.
- **Upside down?** Pass `flip={false}` to `Viewer3D`. Models are centred and scaled automatically.
- **Poster:** pass `poster="robot/peppercorn-stack.jpg"` so there's an image before loading.
- **Real scans:** replace the `standin-test.splat` viewer in the Results chapter with your best scan, then delete the test file.

Meshes work too: `<Viewer3D src="robot/peppercorn.glb" />`.

## Screen captures

Record the real app at 1920 × 1200 with OBS, hide personal paths, and use a real scan rather than the disconnected state. Encode with the same `ffmpeg` command as above.

For `Hotspots`, the pin positions are percentages of the image. Open the page and adjust them by eye.

## Photos

The shot list and lighting advice in your Adaptyv `PLAYBOOK.md` (§3) still apply. For this site's look, shoot against black or concrete, with one hard side light.

## Check before publishing

- Run `npm run build`, then `npm run preview`, and look at the real output.
- `/shotlist` lists what's left.
- Replace any **Stand-in** badge before showing the matching section to anyone important.
