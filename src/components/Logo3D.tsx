import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

const OBJ_URL = 'https://tgdszfywhecqeboxgrip.supabase.co/storage/v1/object/public/logo//untitled.obj';

interface ModelProps {
  autoRotate?: boolean;
}

const Model = ({ autoRotate = true }: ModelProps) => {
  const obj = useLoader(OBJLoader, OBJ_URL);
  const groupRef = useRef<THREE.Group>(null);

  // Apply shiny red metallic material to all meshes
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: '#FF0000',
        metalness: 0.95,
        roughness: 0.05,
        envMapIntensity: 2,
      });
    }
  });

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Auto rotation
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.5;
      }
      // Bouncing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={obj} scale={1.5} />
      </Center>
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#333333" wireframe />
  </mesh>
);

interface Logo3DProps {
  className?: string;
  autoRotate?: boolean;
}

const Logo3D = ({ className = '', autoRotate = true }: Logo3DProps) => {
  return (
    <div className={`w-72 h-72 md:w-96 md:h-96 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.3} />
        <Suspense fallback={<LoadingFallback />}>
          <Model autoRotate={autoRotate} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Logo3D;
