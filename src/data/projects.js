export const projects = [
  {
    id: '01',
    title: 'Omnimovement & Cinematic State Engine',
    discipline: 'ENGINE ARCHITECTURE & ANIMATION',
    visual: 'blackops',
    overview: 'A revolutionary traversal and combat animation pipeline that seamlessly connects sprinting, sliding, and diving in any direction at 120Hz.',
    challenge: 'Eliminating animation blending latency without sacrificing hyper-realistic weight and momentum physics.',
    stack: 'C++20 · Custom Motion Matching · Direct3D 12 Ultimate · SIMD Vectorization',
    metrics: '< 8ms Frame Budget · 4,000+ Mocap Poses · Zero-Latency Input Buffering'
  },
  {
    id: '02',
    title: 'Distributed Real-Time Live Ops Mesh',
    discipline: 'BACKEND & CLOUD INFRASTRUCTURE',
    visual: 'warzone',
    overview: 'A globally distributed microservice architecture managing instant matchmaking, live weapon balancing, and anti-cheat heuristics.',
    challenge: 'Achieving sub-25ms global server tick sync across 100M+ active player sessions under seasonal peak load.',
    stack: 'Golang · Kubernetes · gRPC · eBPF Kernel Telemetry · Redis Cluster',
    metrics: '99.999% Global Uptime · 120M Monthly Active Players · 15ms Avg Match Ping'
  },
  {
    id: '03',
    title: 'Volumetric Ray-Traced Acoustic Occlusion',
    discipline: 'AUDIO TECHNOLOGY & DSP',
    visual: 'audioLab',
    overview: 'A proprietary DSP spatial audio solver calculating physical wave propagation, geometry bounce, and material absorption in real time.',
    challenge: 'Running multi-bounce acoustic ray calculations on hardware audio threads within 0.5ms budgets.',
    stack: 'Wwise Custom Plugins · C++ · AVX-512 · Dolby Atmos Pipeline',
    metrics: '500+ Concurrent Audio Voices · 64 Physical Material Acoustics · Binaural 3D'
  },
  {
    id: '04',
    title: 'Photogrammetry & Procedural World Gen',
    discipline: 'TECHNICAL ART & ENVIRONMENT PIPELINE',
    visual: 'engineTech',
    overview: 'An automated high-density scanning and mesh decimation toolchain transforming real-world terrains into game-ready 8K virtual assets.',
    challenge: 'Streaming gigabytes of geometry and nanite-level meshes dynamically without player pop-in or stutter.',
    stack: 'Houdini Engine · Unreal Engine 5 · Python · Vulkan / DirectX Raytracing',
    metrics: '16km² Seamless Terrain · 8K Virtual Textures · Sub-millimeter Scan Detail'
  }
]
