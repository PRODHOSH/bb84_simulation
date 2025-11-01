import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
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
    <div className="w-full h-[600px] bg-background rounded-lg overflow-hidden border border-border">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <color attach="background" args={["#0a0a1a"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
  <pointLight position={[-5, 5, 5]} intensity={1} color={polarColors.horizontal} />
  <pointLight position={[5, 5, 5]} intensity={1} color={polarColors.diagonal} />
        
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

        {/* Alice (sender) */}
        <group position={[-4, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={polarColors.horizontal} emissive={polarColors.horizontal} emissiveIntensity={0.5} />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.3}
            color={polarColors.horizontal}
            anchorX="center"
            anchorY="middle"
          >
            Alice
          </Text>
        </group>

        {/* Bob (receiver) */}
        <group position={[4, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={polarColors.diagonal} emissive={polarColors.diagonal} emissiveIntensity={0.5} />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.3}
            color={polarColors.diagonal}
            anchorX="center"
            anchorY="middle"
          >
            Bob
          </Text>
        </group>

        {/* Connection line */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[8, 0.02, 0.02]} />
          <meshBasicMaterial color="#444" opacity={0.5} transparent />
        </mesh>

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
