/** The CV page and its PDF are both built from this file. After editing, run: npm run cv:pdf */
export const cv = {
  profile: 'Mechatronics engineer (MSc UPV, 2027) with an industrial-design engineering background. I build complete machines end to end (precision mechanics, motion control, electronics and software), fabricated in my own workshop. My BEng thesis was an automated liquid-dispensing machine for laboratories; my MSc thesis is a 3-axis macro-photogrammetry robot with custom firmware, a digital twin and a GPU reconstruction pipeline.',
  projects: [
    {
      title: 'Macro-photogrammetry robot', meta: 'MSc thesis, UPV. Self-initiated; designed, built and programmed alone', when: '2025–2027', href: '/work/macro-photogrammetry-robot/',
      points: [
        '3-axis positioner for under €500: SFU1605 ball screw on MGN12 rails, capstan drive with a 3D-printed PETG strap on preloaded tapered bearings, GT2 turntable.',
        'Custom STM32F429 firmware: trapezoidal ramps, USB JSON protocol, watchdog and heartbeat safety, StallGuard sensorless homing (σ = 28 µm, commanded positions).',
        'AI-assisted software stack (~45k lines, ~570 tests): PTP camera control, GPU focus stacking, ArUco calibration, COLMAP + RoMa reconstruction. 36/36 views registered below 0.6 px in 4 of 5 scans.',
      ],
    },
    {
      title: 'Automated liquid-dispensing machine for labs', meta: 'BEng thesis, UPCT', when: '2025', href: '/work/liquid-dispenser/',
      points: ['Two self-designed, 3D-printed peristaltic pumps on NEMA 17 steppers; load cell + HX711 close the loop on dispensed mass; ESP32 with an OLED recipe interface.'],
    },
    {
      title: 'Smart camera flash', meta: 'Personal project. Prototype: hardware done, firmware integration in progress', when: '2026', href: '/work/smart-flash/',
      points: ['ESP32-S3 flash with Wi-Fi and BLE phone control and a remote-trigger camera dongle. 4-layer KiCad PCB made by JLCPCB, hand-soldered down to 0402 and QFN.'],
    },
  ],
  experience: [
    {
      title: 'Industrial design and technology engineering intern', meta: 'IDEA Design Mindset, Murcia', when: '2024–2025', href: '/work/idea/',
      points: [
        'In charge of the electronics (hand-built) and firmware of a 3D-printing filament recycling machine for a Kickstarter campaign.',
        'Team member on a lamp that won the iF Design Award, NY Product Design Awards and A\' Design Award. CAD, functional prototypes, mechanical simulation, renders; dealt with Chinese suppliers and manufacturers.',
      ],
    },
    {
      title: 'Freelance engineering, fabrication and teaching', meta: 'Biomedical, research and industrial clients', when: '2023–now',
      points: ['Tens of bone photogrammetry models for a maker of custom anatomical models; 3D-printed insect traps for a Universidad de Murcia research group; a full Fusion 360 CAM and CNC course; SolidWorks and Fusion 360 classes.'],
    },
  ],
  education: [
    { title: 'MSc Mechatronics Engineering', meta: 'Universitat Politècnica de València. Coursework: state-space control, FOC and SVPWM, MATLAB/Simulink, sensors, Omron PLC and SCADA, ABB and Siemens drives', when: '2025–Mar 2027' },
    { title: 'BEng Industrial Design Engineering and Product Development', meta: 'Universidad Politécnica de Cartagena', when: '2020–2025' },
    { title: 'Summer school: Embodied AI and Intelligent Systems', meta: 'Beihang University International Summer School, Hangzhou, China. Certificate of completion', when: 'Jul 2026' },
  ],
  skills: [
    ['Mechanical', 'Strongest area. SolidWorks, Fusion 360, Inventor, Rhino, Blender. Precision positioning (ball screws, MGN rails, capstan and belt drives, preloaded tapered bearings), kinematics, torque and critical-speed sizing, tolerances and fits, DFM, FEA.'],
    ['Fabrication', 'Own workshop: FDM (multi-material, PET-CF, PETG, TPU, ABS), SLA, manual lathe, small CNC. Fusion 360 CAM, custom G-code generation, PCB and part sourcing.'],
    ['Electronics', 'KiCad (4-layer), Altium. Hand soldering down to 0402 and QFN. ESP32 and ESP32-S3, STM32F429, Raspberry Pi; TMC2209 and StallGuard, steppers, HX711 and load cells, PWM LED drivers.'],
    ['Control', 'State-space control, FOC, SVPWM, MATLAB, Simulink. Omron PLCs and SCADA (Sysmac Studio), ABB and Siemens drives, TI motor-control boards.'],
    ['Software', 'Python (OpenCV, PyTorch, PySide6), embedded C++ (PlatformIO), JavaScript, C#, Git. I architect, review and test; AI coding agents write much of the code. Basic C on my own.'],
    ['Imaging and 3D', 'COLMAP, RoMa, Ceres, TSDF fusion, ArUco calibration, gsplat (3DGS and 2DGS), focus stacking. RealityScan, Metashape. Macro optics, cross-polarised lighting.'],
  ] as [string, string][],
  languages: [['Spanish', 'Native'], ['English', 'C2, Cambridge certificate'], ['French', 'Elementary; relearning'], ['Italian', 'Basic']] as [string, string][],
  beyond: 'Building tech since my teens (first FPV racing drone at 16). Photography, hiking, exploring, travelling and mountain biking.',
  practical: 'Spanish (EU) citizen, free to work in Switzerland and the EU (B permit through the employment contract in CH). MSc ends Feb–Mar 2027; available full-time from July 2027 and willing to relocate. Driving licence (B) since 2020.',
};
