import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
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

  // Apply material to all meshes in the OBJ
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: '#000000',
        metalness: 0.3,
        roughness: 0.4,
      });
    }
  });

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={obj} scale={1} />
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
    <div className={`w-48 h-48 md:w-64 md:h-64 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <Suspense fallback={<LoadingFallback />}>
          <Model autoRotate={autoRotate} />
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
