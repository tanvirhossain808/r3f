import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

export default function Experience() {
    const twisterRef = useRef(null)
    const cubeRef = useRef(null)
    const cubeJump = () => {
        const mass = cubeRef.current.mass()
        console.log(cubeRef.current)
        cubeRef.current.applyImpulse({
            x: 0, y: 5 * mass, z: 0
        })
        cubeRef.current.applyTorqueImpulse({
            x: 0, y: 1, z: 0
        })
    }
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twisterRef.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twisterRef.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z })


    })
    return <>

        <color args={["#000000"]} attach="background" />
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <Physics>
            <Debug />
            <RigidBody colliders="ball">
                <mesh castShadow position={[-1.5, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            {/*  <RigidBody colliders="trimesh"
                position={[0, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]} colliders={false}
            >
                <CuboidCollider args={[1.5, 1.5, 0.5]} />
                <mesh castShadow >
                    <torusGeometry args={[1, 0.5, 16, 32]} />
                    <meshStandardMaterial color="mediumpurple" />

                </mesh>
            </RigidBody> */}
            <RigidBody ref={cubeRef} position={[1.5, 2, 0]}
                restitution={0.5}
                friction={0.7}
                colliders={false}
            >
                <mesh castShadow onClick={cubeJump}/* position={[2, 2, 0]} */>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple"

                    />
                </mesh>
                <CuboidCollider mass={1} args={[0.5, 0.5, 0.5]} />
            </RigidBody>
            <RigidBody type='fixed'
                /*  restitution={1} */
                friction={0.7}
            >
                <mesh receiveShadow position-y={- 1.25}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
            <RigidBody
                ref={twisterRef}
                position={[0, -0.8, 0]}
                type='kinematicPosition'
            >
                <mesh castShadow scale={[0.4, 0.4, 3]}>
                    <boxGeometry />
                    <meshStandardMaterial color={"red"} />
                </mesh>
            </RigidBody>
        </Physics>

    </>
}