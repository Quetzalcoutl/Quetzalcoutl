"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  Float, 
  MeshDistortMaterial, 
  MeshTransmissionMaterial, 
  Environment, 
  Points, 
  PointMaterial,
  Torus,
  Sphere,
  Sparkles
} from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, Scanline } from "@react-three/postprocessing"
import * as THREE from "three"

// 1. ADVANCED PARTICLE SYSTEM (With drift and noise)
function ParticleField({ count = 4000 }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25
      s[i] = Math.random() * 2
    }
    return [pos, s]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.03
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
    // Interactive mouse drift
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.mouse.x * 0.5, 0.05)
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00e5ff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  )
}

// 2. THE CRYSTAL CORE (Multi-layered Transmission)
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2
      meshRef.current.rotation.x = t * 0.1
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
    }
  })

  return (
    <group scale={1.8}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Glass Shell */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 15]} />
          <MeshTransmissionMaterial
            backside
            samples={10}
            thickness={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.4}
            distortionScale={0.3}
            temporalDistortion={0.1}
            iridescence={1}
            color="#b0f0ff"
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
          />
        </mesh>
        
        {/* Inner Glowing Core */}
        <Sphere ref={coreRef} args={[0.4, 32, 32]}>
          <meshStandardMaterial 
            color="#00e5ff" 
            emissive="#00e5ff" 
            emissiveIntensity={15} 
            toneMapped={false} 
          />
        </Sphere>
      </Float>
    </group>
  )
}

// 3. KINETIC RINGS (Staggered Rotation)
function KineticRings() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += 0.01 * (i + 1)
      child.rotation.x += 0.005 * (i + 1)
    })
  })

  return (
    <group ref={groupRef}>
      {[2.2, 2.5, 3.0].map((radius, i) => (
        <Torus key={i} args={[radius, 0.015, 16, 100]} rotation={[Math.random(), Math.random(), 0]}>
          <meshStandardMaterial 
            color="#00e5ff" 
            emissive="#00e5ff" 
            emissiveIntensity={5} 
            transparent 
            opacity={0.5} 
            toneMapped={false}
          />
        </Torus>
      ))}
    </group>
  )
}

// 4. FLOATING DRONES (Enhanced Small Orbs)
function FloatingDrones() {
  const orbs = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    speed: 1 + Math.random(),
    pos: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5] as [number, number, number],
    scale: Math.random() * 0.08 + 0.03
  })), [])

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} floatIntensity={2}>
          <Sphere position={orb.pos} scale={orb.scale}>
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={10} toneMapped={false} />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false 
        }}
        // limit device pixel ratio to reduce render resolution
        dpr={[1, 1]}
      >
        <color attach="background" args={["#030303"]} />
        <fog attach="fog" args={["#030303", 5, 25]} />

        {/* High-Contrast Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
        
        <Suspense fallback={null}>
          <group>
            <CentralOrb />
            <KineticRings />
            {/* increased particles for cool effect */}
            <ParticleField count={4000} />
            <FloatingDrones />
            
            {/* Distant Warp Object */}
            <Float speed={3}>
              <mesh position={[5, -2, -5]} scale={1.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                  color="#001111"
                  speed={4}
                  distort={0.5}
                  emissive="#00e5ff"
                  emissiveIntensity={0.5}
                  metalness={1}
                  roughness={0}
                />
              </mesh>
            </Float>

            <Sparkles count={50} scale={8} size={1.5} speed={0.4} color="#00e5ff" />
          </group>

          <Environment preset="night" />

          {/* POST PROCESSING: The "Cinema" Look */}
          <EffectComposer multisampling={0}>
            {/* dial back some passes for speed and lightness */}
            <Bloom 
              mipmapBlur 
              intensity={0.8} 
              luminanceThreshold={1.2} 
              radius={0.3} 
            />
            {/* chromatic kept minimal */}
            <ChromaticAberration 
              offset={new THREE.Vector2(0.0004, 0.0004)} 
            />
            {/* reduced noise/scanline for a cleaner image */}
            <Scanline opacity={0.005} />
            <Noise opacity={0.01} />
            <Vignette eskil={false} offset={0.15} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* HUD Elements Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-cyan-500/20 m-8 flex flex-col justify-between p-6 uppercase text-[10px] tracking-[0.3em] text-cyan-400/50 font-mono">
        <div className="flex justify-between">
          <span>System.Init()</span>
          <span>Core_Stable</span>
        </div>
        <div className="flex justify-between items-end">
          <span>Neural Interface v.2.0.4</span>
          <span className="text-right">37.23° N / 115.81° W</span>
        </div>
      </div>
    </div>
  )
}