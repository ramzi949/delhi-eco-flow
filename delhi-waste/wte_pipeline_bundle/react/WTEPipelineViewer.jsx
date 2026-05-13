'use client';
/**
 * WTEPipelineViewer.jsx
 *
 * Interactive 3D viewer for the Delhi Eco-Flow waste-to-energy pipeline.
 * Drop into any React app (Next.js, Vite, CRA, Remix).
 *
 * Required packages:
 *   npm install three @react-three/fiber @react-three/drei
 *
 * Asset:
 *   Place pipeline_web.glb in your public folder (e.g. /public/pipeline_web.glb).
 *   If you put it elsewhere, override via the `modelUrl` prop.
 *
 * Basic usage:
 *   import WTEPipelineViewer from './WTEPipelineViewer';
 *   <WTEPipelineViewer />
 *
 * Custom props (all optional):
 *   <WTEPipelineViewer
 *     modelUrl="/pipeline_web.glb"   // path to the GLB
 *     height="600px"                  // viewer height
 *     autoRotate={true}               // start with auto-rotate on
 *     showStagePanel={true}           // show the right-hand stage info panel
 *     accentColor="#7dd190"           // brand accent (defaults to Eco-Flow leaf green)
 *   />
 */

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------
// STAGE DATA — content for the right-hand info panel
// ---------------------------------------------------------------
const STAGES = [
  {
    id: 1,
    label: 'Stage 01',
    title: 'Three input streams.',
    body: 'Waste is separated at the source into three streams. Each is processed by a dedicated facility designed to extract maximum value before anything reaches thermal recovery.',
    cameraPos: [-100, 80, 140],
    cameraTarget: [-65, 25, 0],
    items: [
      { color: '#5fb874', name: 'Organic / Wet Waste', desc: 'Routed to a biogas digester producing cooking gas + compost. Nothing is burned.' },
      { color: '#4a90c2', name: 'Dry Waste', desc: 'Paper, plastic, metal, glass — hand-sorted and sent to recycling centres.' },
      { color: '#d97a3a', name: 'Hazardous Waste', desc: 'Batteries, medicines, chemicals — sealed in containment drums.' },
    ],
  },
  {
    id: 2,
    label: 'Stage 02',
    title: 'Only the residual reaches the incinerator.',
    body: 'Each processing unit sends only its non-recoverable remainder to a central junction, which feeds the incinerator. Typically 15–25% of original waste mass by this stage.',
    cameraPos: [-10, 70, 130],
    cameraTarget: [-5, 20, 0],
    items: [
      { color: '#8a978d', name: 'Residual Junction', desc: 'Where the three residual flows merge.' },
      { color: '#8a978d', name: 'Feed to WTE', desc: 'Metered into the primary chamber, combusted at 850–1100°C.' },
    ],
  },
  {
    id: 3,
    label: 'Stage 03',
    title: 'A triple-layer filtration tower.',
    body: 'Hot flue gas rises through three sequential treatment stages. No untreated gas ever reaches the stack.',
    cameraPos: [120, 110, 130],
    cameraTarget: [25, 50, 0],
    items: [
      { color: '#c9a85c', name: '1. Particulate Filter (ESP)', desc: 'Traps fly ash, soot, and PM2.5 on charged plates.' },
      { color: '#b88dc4', name: '2. Acid Gas Scrubber', desc: 'Lime spray neutralises HCl, SO₂, HF into harmless calcium salts.' },
      { color: '#6ec0c8', name: '3. Carbon Capture', desc: 'Amine solvent binds CO₂ for storage or industrial reuse.' },
    ],
  },
  {
    id: 4,
    label: 'Stage 04',
    title: 'Clean air. Clean energy.',
    body: 'After three filtration stages, what exits the tower is essentially scrubbed air. The thermal energy is converted to electricity and fed to the grid.',
    cameraPos: [160, 70, 100],
    cameraTarget: [50, 30, 0],
    items: [
      { color: '#7dd190', name: 'Clean Air Output', desc: 'Continuously monitored against CPCB emission standards.' },
      { color: '#f4d35e', name: 'Electricity Output', desc: 'Steam turbine generates power fed into the Delhi grid.' },
    ],
  },
];

// ---------------------------------------------------------------
// MODEL — loads the GLB and applies a unified matte material
// ---------------------------------------------------------------
function PipelineModel({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    // The STL was Z-up; trimesh's GLB export preserves that. Three.js is Y-up,
    // so rotate -90° around X.
    scene.rotation.x = -Math.PI / 2;

    // Re-center horizontally and seat on the ground plane
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = bbox.getCenter(new THREE.Vector3());
    scene.position.x -= center.x;
    scene.position.z -= center.z;
    scene.position.y -= bbox.min.y;

    // Apply a unified architectural material
    const material = new THREE.MeshStandardMaterial({
      color: 0xc8cfc8,
      roughness: 0.78,
      metalness: 0.08,
    });

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// ---------------------------------------------------------------
// CAMERA CONTROLLER — animates between stage focus points
// ---------------------------------------------------------------
function CameraController({ target, position, controlsRef }) {
  const { camera } = useThree();
  const animRef = useRef(null);

  useEffect(() => {
    if (!target || !position || !controlsRef.current) return;

    const startPos = camera.position.clone();
    const startTarget = controlsRef.current.target.clone();
    const endPos = new THREE.Vector3(...position);
    const endTarget = new THREE.Vector3(...target);
    const startTime = performance.now();
    const duration = 1100;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const e = easeInOutCubic(t);
      camera.position.lerpVectors(startPos, endPos, e);
      controlsRef.current.target.lerpVectors(startTarget, endTarget, e);
      controlsRef.current.update();
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => animRef.current && cancelAnimationFrame(animRef.current);
  }, [target, position, camera, controlsRef]);

  return null;
}

// ---------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------
export default function WTEPipelineViewer({
  modelUrl = '/pipeline_web.glb',
  height = '600px',
  autoRotate: initialAutoRotate = false,
  showStagePanel = true,
  accentColor = '#7dd190',
}) {
  const [activeStage, setActiveStage] = useState(STAGES[0]);
  const [autoRotate, setAutoRotate] = useState(initialAutoRotate);
  const [cameraTransition, setCameraTransition] = useState(null);
  const controlsRef = useRef();

  const handleStageClick = (stage) => {
    setActiveStage(stage);
    setCameraTransition({
      position: stage.cameraPos,
      target: stage.cameraTarget,
      key: stage.id + '-' + Date.now(),
    });
  };

  return (
    <div
      className="wte-viewer"
      style={{
        '--accent': accentColor,
        display: 'grid',
        gridTemplateColumns: showStagePanel ? '1fr 320px' : '1fr',
        height,
        background: '#0d1411',
        border: '1px solid #2a3631',
        borderRadius: '6px',
        overflow: 'hidden',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        color: '#e8efe8',
        position: 'relative',
      }}
    >
      {/* CANVAS */}
      <div style={{ position: 'relative', minHeight: '300px' }}>
        <Canvas
          shadows
          camera={{ position: [180, 140, 200], fov: 35, near: 0.5, far: 2000 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        >
          {/* Lights */}
          <ambientLight intensity={0.35} color={0xc8d4cc} />
          <directionalLight
            position={[140, 220, 100]}
            intensity={1.4}
            color={0xfff0d4}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-200}
            shadow-camera-right={200}
            shadow-camera-top={200}
            shadow-camera-bottom={-200}
            shadow-camera-near={0.5}
            shadow-camera-far={700}
            shadow-bias={-0.0005}
          />
          <directionalLight position={[-150, 100, -60]} intensity={0.55} color={0x88a8c8} />
          <directionalLight position={[0, 60, -200]} intensity={0.45} color={0x5fb874} />
          <hemisphereLight intensity={0.35} args={[0xb0d0b8, 0x1a241e]} />

          {/* Shadow plane */}
          <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={400} blur={2.5} far={20} />

          {/* Faint grid */}
          <gridHelper args={[800, 40, 0x2a3631, 0x1a241e]} position={[0, 0, 0]} />

          {/* Model */}
          <Suspense fallback={null}>
            <PipelineModel url={modelUrl} />
          </Suspense>

          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
            minDistance={60}
            maxDistance={450}
            maxPolarAngle={Math.PI * 0.49}
            autoRotate={autoRotate}
            autoRotateSpeed={0.6}
            target={[0, 30, 0]}
          />

          {cameraTransition && (
            <CameraController
              key={cameraTransition.key}
              position={cameraTransition.position}
              target={cameraTransition.target}
              controlsRef={controlsRef}
            />
          )}
        </Canvas>

        {/* Top-left title overlay */}
        <div
          style={{
            position: 'absolute',
            top: 22,
            left: 22,
            pointerEvents: 'none',
            fontFamily: '"Fraunces", Georgia, serif',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.025em' }}>
            The <em style={{ color: accentColor, fontStyle: 'italic' }}>ethical</em>
            <br />
            incinerator.
          </div>
          <div
            style={{
              fontSize: 9.5,
              letterSpacing: '0.3em',
              color: '#8a978d',
              textTransform: 'uppercase',
              marginTop: 10,
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            Drag · Scroll · Click stages
          </div>
        </div>

        {/* Bottom-right auto-rotate toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            background: autoRotate ? 'rgba(95,184,116,0.12)' : 'rgba(20,28,23,0.78)',
            border: `1px solid ${autoRotate ? accentColor : '#2a3631'}`,
            color: autoRotate ? accentColor : '#8a978d',
            padding: '9px 15px',
            fontFamily: 'inherit',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
        >
          Auto-rotate {autoRotate ? 'on' : 'off'}
        </button>
      </div>

      {/* SIDE PANEL */}
      {showStagePanel && (
        <aside
          style={{
            borderLeft: '1px solid #2a3631',
            padding: '28px 22px',
            overflowY: 'auto',
            background: 'rgba(13,20,17,0.45)',
            fontSize: 12,
          }}
        >
          <div
            style={{
              fontSize: 9.5,
              letterSpacing: '0.3em',
              color: accentColor,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Pipeline Stages
          </div>

          {/* Stage selector */}
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
            {STAGES.map((s) => {
              const isActive = activeStage.id === s.id;
              return (
                <li
                  key={s.id}
                  onClick={() => handleStageClick(s)}
                  style={{
                    padding: '12px 0 12px 18px',
                    borderLeft: `1.5px solid ${isActive ? accentColor : '#2a3631'}`,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: -5,
                      top: 18,
                      width: 8,
                      height: 8,
                      background: isActive ? accentColor : '#0d1411',
                      border: `1.5px solid ${isActive ? accentColor : '#2a3631'}`,
                      borderRadius: '50%',
                      boxShadow: isActive ? `0 0 0 4px ${accentColor}22` : 'none',
                      transition: 'all 0.2s',
                    }}
                  />
                  <div style={{ fontSize: 8.5, letterSpacing: '0.3em', color: '#4a5851', textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontWeight: 400,
                      fontSize: 14,
                      marginTop: 3,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {s.title}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Detail of selected stage */}
          <div
            style={{
              borderTop: '1px solid #2a3631',
              paddingTop: 18,
              fontSize: 11,
              lineHeight: 1.65,
              color: '#e8efe8',
              fontWeight: 300,
            }}
          >
            <p style={{ marginBottom: 16, margin: '0 0 16px 0' }}>{activeStage.body}</p>
            {activeStage.items.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '9px 0 9px 12px',
                  borderLeft: `2px solid ${item.color}`,
                  marginBottom: 6,
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 500,
                    fontSize: 12.5,
                    marginBottom: 3,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {item.name}
                </strong>
                <span style={{ color: '#8a978d', fontSize: 10.5, lineHeight: 1.55 }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

// Preload the model so it's ready when the component mounts.
// Adjust the path here if you serve the GLB from somewhere other than /public root.
useGLTF.preload('/pipeline_web.glb');
