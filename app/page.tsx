"use client";

import NavigationModal from "@/components/NavigationModal";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as THREE from "three";

const roles = ["Software Engineer.", "Undergraduate Student.", "Web Developer.", "Mobile Developer."];

function BubbleCluster() {
  const groupRef = useRef<THREE.Group>(null);

  // 1️⃣ Generate Random Spheres
  // Use state instead of useMemo to avoid hydration mismatches.
  // We initialize with an empty array on the server (SSR), and fill it randomly only on the client.
  const [spheres, setSpheres] = useState<any[]>([]);

  useEffect(() => {
    const count = 60;

    // Step 1: Generate random positions in a spherical cluster
    const temp = new Array(count).fill(0).map(() => {
      // Use math to make a perfect spherical cluster instead of a square box
      const radius = Math.random() * 1.8; // Max radius of 1.8
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      return {
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ] as [number, number, number],
        // Use a simple random distribution but with a wide range, ensuring a smooth,
        // even mix of every size between 0.2 (smallest) and 1.0 (largest).
        scale: Math.random() * 0.75 + 0.2,
        timeOffset: Math.random() * Math.PI * 2,
      };
    });

    // Step 2: Compute centroid
    const center = temp.reduce(
      (acc, sphere) => {
        acc.x += sphere.position[0];
        acc.y += sphere.position[1];
        acc.z += sphere.position[2];
        return acc;
      },
      { x: 0, y: 0, z: 0 }
    );

    center.x /= count;
    center.y /= count;
    center.z /= count;

    // Step 3: Subtract centroid from each sphere
    const centered = temp.map((sphere) => ({
      ...sphere,
      position: [
        sphere.position[0] - center.x,
        sphere.position[1] - center.y,
        sphere.position[2] - center.z,
      ] as [number, number, number],
    }));

    setSpheres(centered);
  }, []);

  // 2️⃣ Floating + Mouse Interaction
  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth floating for the entire group
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

    // Very smooth easing for mouse interaction
    const targetX = state.pointer.x * 0.2;
    const targetY = state.pointer.y * 0.2;

    // Lerp to the target rotation for smooth cursor reaction
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;

    // Slight group auto rotation
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <Sphere key={i} {...sphere} />
      ))}
    </group>
  );
}

function Sphere({ position, scale, timeOffset }: { position: [number, number, number]; scale: number; timeOffset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Base floating animation
    const targetX = basePosition.x + Math.cos(state.clock.elapsedTime + timeOffset) * 0.1;
    const targetY = basePosition.y + Math.sin(state.clock.elapsedTime + timeOffset) * 0.15;
    const targetZ = basePosition.z + Math.sin(state.clock.elapsedTime * 0.5 + timeOffset) * 0.1;
    const targetPos = new THREE.Vector3(targetX, targetY, targetZ);

    // Get current world position of the sphere
    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);

    // Calculate cursor world position roughly at the sphere's z-depth
    const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vec.unproject(state.camera);
    const dir = vec.sub(state.camera.position).normalize();
    const distance = (worldPos.z - state.camera.position.z) / dir.z;
    const pointerWorldPos = state.camera.position.clone().add(dir.multiplyScalar(distance));
    // Calculate distance and repel
    // Mouse goes near -> spheres significantly move away
    const dist = pointerWorldPos.distanceTo(worldPos);
    const repelRadius = 3.5; // Increased interaction distance significantly from 1.5
    if (dist < repelRadius) {
      // Repel from cursor
      const repelDir = worldPos.clone().sub(pointerWorldPos).normalize();
      // Convert world repel direction to local space for the group
      if (meshRef.current.parent) {
        repelDir.transformDirection(meshRef.current.parent.matrixWorld.clone().invert());
      }

      // Much stronger push force based on how close the mouse is
      const force = (repelRadius - dist) * 2.5; // Multiplied significantly from 0.8
      targetPos.add(repelDir.multiplyScalar(force));
    }

    // Faster Lerp towards target position for a snappy but smooth bounce back
    meshRef.current.position.lerp(targetPos, 0.15); // Increased from 0.08
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#dcdcdc"
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function Home() {

  const [no, setNo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNo((prev) => {
        if (prev >= roles.length - 1)
          return 0
        else
          return prev + 1
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <main className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#B0BEC5] to-[#FFFFFF]">

        <div className="absolute top-9 left-12 z-50 cursor-pointer">
          <svg width="43" height="43" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="#F5F5F5"
              strokeWidth="3"
              fill="#F5F5F5"
            />

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, sans-serif"
              fontSize="65"
              fontWeight="400"
              fill="#B0BEC5"
              letterSpacing="-2"
            >
              T.
            </text>
          </svg>
        </div>

        <div
          onClick={() => {
            setIsModalOpen(true)
          }}
          className="absolute z-50 top-9 right-11 cursor-pointer">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="8"
              y1="15"
              x2="34"
              y2="15"
              stroke="#F5F5F5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="25"
              x2="34"
              y2="25"
              stroke="#F5F5F5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Background Gradient & Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            <BubbleCluster />
          </Canvas>
        </div>

        {/* Big bold text overlay */}
        <div className="pointer-events-none relative z-10 flex flex-col h-full items-center justify-center">
          <h1 className="text-[12.5vw] font-black font-space-grotesk tracking-tigh text-[#F5F5F5] drop-shadow-sm">
            THENURI
          </h1>
          <p className="text-[3.5vw] font-poppins font-extralight text-white tracking-wider drop-shadow-sm translate-y-[-10px]">{roles[no]}</p>
        </div>

        <AnimatePresence>
          {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
        </AnimatePresence>
      </main>
    </>
  );
}