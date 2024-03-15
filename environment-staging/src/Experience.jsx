import { useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import *as THREE from "three"

export default function Experience() {
    const cube = useRef(null)
    const directionalLight = useRef(null)
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    return <>
        <color args={["black"]} attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight ref={directionalLight} castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh position-x={- 2} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube} castShadow position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}