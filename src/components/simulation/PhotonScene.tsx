import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text, PerspectiveCamera, Line } from "@react-three/drei";
import { useMemo } from "react";
import PhotonParticle from "./PhotonParticle";
import { PhotonData } from "@/hooks/useBB84Simulation";

interface PhotonSceneProps {
  photons: PhotonData[];
  currentPhotonIndex: number;
}


const PhotonScene = ({ photons, currentPhotonIndex }: PhotonSceneProps) => {
  const polarColors = useMemo(() => {
    if (typeof window === "undefined") return {
      horizontal: "#60a5fa",
      diagonal: "#a855f7",
      vertical: "#00f0ff",
      antidiagonal: "#ff6ec7",
    };
    const css = getComputedStyle(document.documentElement);
    return {
      horizontal: css.getPropertyValue("--polar-horizontal").trim() || "#60a5fa",
      diagonal: css.getPropertyValue("--polar-diagonal").trim() || "#a855f7",
      vertical: css.getPropertyValue("--polar-vertical").trim() || "#00f0ff",
      antidiagonal: css.getPropertyValue("--polar-antidiagonal").trim() || "#ff6ec7",
    };
  }, []);
  return (
    <div className="w-full h-[600px] bg-background rounded-lg overflow-hidden border border-border shadow-2xl">
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          alpha: false 
        }}
      >
        <color attach="background" args={["#0a0a1a"]} />
        <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={50} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[-5, 5, 5]} intensity={1.5} color={polarColors.horizontal} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={polarColors.diagonal} />
        <pointLight position={[0, -3, 3]} intensity={0.8} color={polarColors.vertical} />
        <spotLight position={[0, 8, 0]} intensity={0.5} angle={0.6} penumbra={1} color="#ffffff" />
        
        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Quantum Channel - Glowing tube */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 8, 32]} />
          <meshStandardMaterial 
            color={polarColors.vertical} 
            emissive={polarColors.vertical} 
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
          />
        </mesh>
        
        {/* Channel inner glow */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 8.2, 32]} />
          <meshBasicMaterial 
            color={polarColors.diagonal} 
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Alice (sender) - Enhanced */}
        <group position={[-4, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial 
              color={polarColors.horizontal} 
              emissive={polarColors.horizontal} 
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Glow effect */}
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshBasicMaterial 
              color={polarColors.horizontal} 
              transparent 
              opacity={0.1}
            />
          </mesh>
          <Text
            position={[0, -0.9, 0]}
            fontSize={0.35}
            color={polarColors.horizontal}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            Alice
          </Text>
          <Text
            position={[0, -1.3, 0]}
            fontSize={0.2}
            color="#888"
            anchorX="center"
            anchorY="middle"
          >
            Sender
          </Text>
        </group>

        {/* Bob (receiver) - Enhanced */}
        <group position={[4, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial 
              color={polarColors.diagonal} 
              emissive={polarColors.diagonal} 
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Glow effect */}
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshBasicMaterial 
              color={polarColors.diagonal} 
              transparent 
              opacity={0.1}
            />
          </mesh>
          <Text
            position={[0, -0.9, 0]}
            fontSize={0.35}
            color={polarColors.diagonal}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            Bob
          </Text>
          <Text
            position={[0, -1.3, 0]}
            fontSize={0.2}
            color="#888"
            anchorX="center"
            anchorY="middle"
          >
            Receiver
          </Text>
        </group>

        {/* Grid floor for depth perception */}
        <gridHelper args={[10, 10, '#333', '#222']} position={[0, -2, 0]} />

        {/* Photons */}
        {photons.map((photon, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const x = -2 + col * 1.3;
          const y = 1.5 - row * 0.8;
          
          return (
            <PhotonParticle
              key={photon.id}
              position={[x, y, 0]}
              polarization={photon.polarization}
              basesMatch={photon.basesMatch}
              delay={index * 0.2}
              isActive={index <= currentPhotonIndex}
            />
          );
        })}

        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default PhotonScene;
