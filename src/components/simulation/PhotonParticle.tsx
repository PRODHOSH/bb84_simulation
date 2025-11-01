import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Polarization } from "@/hooks/useBB84Simulation";

interface PhotonParticleProps {
  position: [number, number, number];
  polarization: Polarization;
  basesMatch: boolean;
  delay: number;
  isActive: boolean;
}


const PhotonParticle = ({ 
  position, 
  polarization, 
  basesMatch, 
  delay,
  isActive 
}: PhotonParticleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const getColor = () => {
    if (!isActive) return "#444444";
    return basesMatch ? "#22c55e" : "#ef4444"; // green or red
  };

  // Read polarization colors from CSS variables so they can be changed globally
  const polarVars = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        vertical: "#00f0ff",
        horizontal: "#60a5fa",
        diagonal: "#a855f7",
        antidiagonal: "#ff6ec7",
      };
    }
    const css = getComputedStyle(document.documentElement);
    return {
      vertical: css.getPropertyValue("--polar-vertical").trim() || "#00f0ff",
      horizontal: css.getPropertyValue("--polar-horizontal").trim() || "#60a5fa",
      diagonal: css.getPropertyValue("--polar-diagonal").trim() || "#a855f7",
      antidiagonal: css.getPropertyValue("--polar-antidiagonal").trim() || "#ff6ec7",
    };
  }, []);

  const getCoreColor = () => {
    switch (polarization) {
      case "vertical":
        return polarVars.vertical;
      case "horizontal":
        return polarVars.horizontal;
      case "diagonal":
        return polarVars.diagonal;
      case "antidiagonal":
        return polarVars.antidiagonal;
      default:
        return "#9ca3af";
    }
  };

  const getGlowColor = () => {
    // Keep match/mismatch glow semantics but slightly tinted so polarization remains visible
    if (!isActive) return "#222222";
    return basesMatch ? "#22c55e" : "#ef4444";
  };

  const getRotation = (): [number, number, number] => {
    switch (polarization) {
      case "vertical":
        return [0, 0, 0];
      case "horizontal":
        return [0, 0, Math.PI / 2];
      case "diagonal":
        return [0, 0, Math.PI / 4];
      case "antidiagonal":
        return [0, 0, -Math.PI / 4];
      default:
        return [0, 0, 0];
    }
  };

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    if (meshRef.current && glowRef.current && timeRef.current > delay) {
      // Pulsing animation
      const scale = 1 + Math.sin(timeRef.current * 3) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
      glowRef.current.scale.set(scale * 1.5, scale * 1.5, scale * 1.5);

      // Rotate based on polarization
      meshRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group position={position} rotation={getRotation()}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={getGlowColor()}
          transparent
          opacity={isActive ? 0.28 : 0.08}
        />
      </mesh>
      
      {/* Core photon */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={getCoreColor()}
          emissive={getCoreColor()}
          emissiveIntensity={isActive ? 2 : 0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Polarization indicator - small arrow */}
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[0.03, 0.1, 8]} />
        <meshStandardMaterial
          color={getCoreColor()}
          emissive={getCoreColor()}
          emissiveIntensity={isActive ? 1.2 : 0.25}
        />
      </mesh>
    </group>
  );
};

export default PhotonParticle;
