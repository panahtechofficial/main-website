"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Model({ scrollProgress, isInHero, modelScale }) {
    const { scene } = useGLTF("/Quest3.glb");
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            // Always rotate automatically
            modelRef.current.rotation.y += 0.005;
            // Add scroll-based rotation speed boost
            modelRef.current.rotation.y += scrollProgress * 0.02;
            // Subtle tilt
            modelRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        }
    });

    return (
        <Float
            speed={isInHero ? 2 : 1.5}
            rotationIntensity={isInHero ? 0.4 : 0.2}
            floatIntensity={isInHero ? 0.6 : 0.3}
        >
            <primitive 
                ref={modelRef}
                object={scene} 
                scale={modelScale}
                position={[0, 0, 0]}
            />
        </Float>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#F97316" wireframe />
        </mesh>
    );
}

export default function FloatingModel3D({ className = "" }) {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isInHero, setIsInHero] = useState(true);
    const [dimensions, setDimensions] = useState({
        size: 300,
        top: "45%",
        right: "3%",
        modelScale: 1.5  // 🎯 Scale awal model 3D
    });

    useEffect(() => {
        // Scroll-based size and position animation
        const updateOnScroll = () => {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;
            const progress = Math.min(scrollY / heroHeight, 1);
            
            setScrollProgress(progress);
            setIsInHero(scrollY < heroHeight * 0.5);

            // ============================================
            // 🎮 CONFIG: HERO SECTION (saat scroll = 0)
            // ============================================
            const HERO_SIZE = 300;        // Ukuran saat di Hero (px)
            const HERO_TOP = 50;          // Posisi dari atas (%)
            const HERO_RIGHT = 12;         // Posisi dari kanan (%)

            // ============================================
            // 📜 CONFIG: SCROLLED SECTION (saat scroll penuh)
            // ============================================
            const SCROLLED_SIZE = 300;    // Ukuran minimum saat scroll (px)
            const SCROLLED_TOP = 70;      // Posisi dari atas saat scroll (%)
            const SCROLLED_RIGHT = -5;    // Posisi dari kanan saat scroll (%, negatif = keluar layar)

            // ============================================
            // 🎯 CONFIG: MODEL SCALE (ukuran 3D model)
            // ============================================
            const HERO_MODEL_SCALE = 5;      // Scale model di Hero (lebih besar = lebih terlihat)
            const SCROLLED_MODEL_SCALE = 1; // Scale model setelah scroll

            // ============================================
            // 🔄 Interpolasi (jangan ubah kecuali paham)
            // ============================================
            const size = HERO_SIZE - (progress * (HERO_SIZE - SCROLLED_SIZE));
            const topPercent = HERO_TOP + (progress * (SCROLLED_TOP - HERO_TOP));
            const rightPercent = HERO_RIGHT + (progress * (SCROLLED_RIGHT - HERO_RIGHT));
            const modelScale = HERO_MODEL_SCALE - (progress * (HERO_MODEL_SCALE - SCROLLED_MODEL_SCALE));

            setDimensions({
                size: Math.max(size, SCROLLED_SIZE),
                top: `${topPercent}%`,
                right: `${rightPercent}%`,
                modelScale: modelScale
            });
        };

        window.addEventListener("scroll", updateOnScroll, { passive: true });
        updateOnScroll(); // Initial call

        return () => window.removeEventListener("scroll", updateOnScroll);
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`fixed pointer-events-none transition-all duration-300 ease-out ${className}`}
            style={{
                width: `${dimensions.size}px`,
                height: `${dimensions.size}px`,
                top: dimensions.top,
                right: dimensions.right,
                transform: "translateY(-50%)",
                zIndex: 5,
                opacity: isInHero ? 1 : 0.8
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 2], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <spotLight position={[-10, -10, -5]} intensity={0.4} />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#F97316" />
                
                <Suspense fallback={<LoadingFallback />}>
                    <Model scrollProgress={scrollProgress} isInHero={isInHero} modelScale={dimensions.modelScale} />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload model
useGLTF.preload("/Quest3.glb");
