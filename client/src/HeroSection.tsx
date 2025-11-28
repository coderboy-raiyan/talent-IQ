/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArrowRight, Menu, Star } from "lucide-react";
import { useRef } from "react";

// --- 3D Components ---

const StarShape = (props: any) => {
  const meshRef = useRef<any>(null);

  // Add slow rotation
  useFrame((__, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group {...props}>
      <mesh ref={meshRef}>
        {/* An Octahedron looks like a stylized diamond/star */}
        <octahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          color="#f97316" // Tailwind orange-500
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          distort={0.3} // Adds a liquid-like subtle shift
          speed={2}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      {/* Lighting & Environment */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffedd5" />

      {/* Environment reflection for the shiny material */}
      <Environment preset="sunset" />

      {/* Floating Animation Wrapper */}
      <Float
        speed={2} // Animation speed
        rotationIntensity={1} // XYZ rotation intensity
        floatIntensity={2} // Up/down float intensity
        floatingRange={[-0.2, 0.2]}
      >
        <StarShape position={[0, 0, 0]} />
      </Float>

      {/* Shadows and Glow effect */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#f97316"
      />

      {/* User Interaction */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

// --- UI Components ---

const NavBar = () => (
  <nav className="flex items-center justify-between py-6 px-6 md:px-12 max-w-7xl mx-auto w-full">
    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
        <Star size={16} fill="currentColor" />
      </div>
      <span>
        ASTRA<span className="text-orange-500">.IO</span>
      </span>
    </div>

    {/* Desktop Menu */}
    <ul className="hidden md:flex items-center gap-8 font-medium text-gray-600 text-sm">
      {["Products", "Solutions", "Pricing", "Company"].map((item) => (
        <li
          key={item}
          className="hover:text-black cursor-pointer transition-colors"
        >
          {item}
        </li>
      ))}
    </ul>

    <div className="flex items-center gap-4">
      <button className="hidden md:block px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
        Let's talk
      </button>
      <button className="md:hidden p-2 text-gray-600">
        <Menu />
      </button>
    </div>
  </nav>
);

const Tag = ({ text }: { text: string }) => (
  <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">
    {text}
  </span>
);

// --- Main Page Component ---

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-orange-100 flex flex-col overflow-hidden">
      <NavBar />

      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 md:px-12 py-12 lg:py-0 gap-12 lg:gap-0">
        {/* Left Column: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10 space-y-8">
          {/* Tagline Row */}
          <div className="flex flex-wrap gap-3 animate-fade-in-up">
            <Tag text="Version 2.0" />
            <Tag text="Now Live" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Build the <br />
            <span className="relative inline-block">
              <span className="absolute -top-6 -right-8 text-orange-500 animate-pulse">
                <Star fill="currentColor" size={40} />
              </span>
              Future
            </span>{" "}
            of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Digital Creativity
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            Unleash your brand's potential with our next-gen design engine.
            Beautiful, fast, and accessible.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center justify-center px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-gray-50 hover:border-gray-300">
              View Showreel
            </button>
          </div>

          {/* Social Proof / Small details */}
          <div className="pt-8 flex items-center gap-4 text-xs font-medium text-gray-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                />
              ))}
            </div>
            <p>Trusted by 10,000+ designers</p>
          </div>
        </div>

        {/* Right Column: 3D Scene */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
          {/* Background Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene />
          </Canvas>
        </div>
      </main>
    </div>
  );
}
