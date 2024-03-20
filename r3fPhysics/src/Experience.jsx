import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { CuboidCollider, CylinderCollider, Debug, InstancedRigidBodies, Physics, RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

export default function Experience() {
    const hamburger = useGLTF('./hamburger.glb')
    const [hitSound] = useState(() => {
        return new Audio("./hit.mp3")
    })
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

    const collisionEnter = () => {
        /*        hitSound.currentTime = 0
               hitSound.volume = Math.random()
               hitSound.play() */
    }
    const collisionExit = () => {
        // console.log('exit');
    }
    const cubeCount = 100
    const cubes = useRef(null)

    /*     useEffect(() => {
            for (let i = 0; i < cubeCount; i++) {
                const matrix = new THREE.Matrix4()
                matrix.compose(
                    new THREE.Vector3(i * 2),
                    new THREE.Quaternion(),
                    new THREE.Vector3(1, 1, 1)
    
                )
                cubes.current.setMatrixAt(i, matrix)
            }
        }, []) */
    const cubesTransform = useMemo(() => {
        const position = []
        const rotation = []
        const scales = []

        for (let i = 0; i < cubeCount; i++) {
            position.push([(Math.random() - 0.5) * 8, 6 + i * 0.2, (Math.random() - 0.5) * 8])

            rotation.push([Math.random(), Math.random(), Math.random()])

            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale, scale, scale])
        }

        return {
            position, rotation, scales
        }

    }, [])

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
                onCollisionEnter={collisionEnter}
                onCollisionExit={collisionExit}
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
            <RigidBody position={[0, 4, 0]}
                colliders={false}

            >
                <primitive object={hamburger.scene} scale={0.25} />
                <CylinderCollider args={[0.5, 1.25]} />
            </RigidBody>
            <RigidBody type='fixed'>
                <CuboidCollider args={[5, 2, 0.5]}
                    position={[0, 1, 5.25]}
                />
                <CuboidCollider args={[5, 2, 0.5]}
                    position={[0, 1, -5.25]}
                />
                <CuboidCollider args={[0.5, 2, 5]}
                    position={[-5.5, 1, 0]}
                />
                <CuboidCollider args={[0.5, 2, 5]}
                    position={[5.5, 1, 0]}
                />

            </RigidBody>
            <InstancedRigidBodies
                positions={cubesTransform.position}
                rotations={cubesTransform.rotation}
            // scales={cubesTransform.scales}


            >
                <instancedMesh castShadow ref={cubes} args={[null, null, cubeCount]}>
                    <boxGeometry />
                    <meshStandardMaterial color="tomato"

                    />

                </instancedMesh>
            </InstancedRigidBodies>

        </Physics>

    </>
}