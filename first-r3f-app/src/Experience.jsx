import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import CustomObject from "./CustomObject";

extend({ OrbitControls: OrbitControls })
// extend({ OrbitControls: OrbitControls }) as same as the top one .extend need a object .

const Experience = () => {
    const { camera, gl } = useThree()

    const cubeRef = useRef(null)
    const groupRef = useRef(null)

    useFrame((state, deltaTime) => {
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
        cubeRef.current.rotation.y += deltaTime
        // groupRef.current.rotation.y += deltaTime  
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group ref={groupRef}>
                <mesh ref={cubeRef}  /* rotation-y={Math.PI * 0.23} position={[2, 0, 0]} */ /* scale={[1.5, 1.5, 1.5]} */ position-x={2}>
                    {/* <torusKnotGeometry />
            <meshNormalMaterial /> */}


                    {/* <sphereBufferGeometry args={[1.5, 32, 32]} /> */}
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial args={[
                        {
                            color: "red",
                            /* wireframe: true */
                        }
                    ]} />

                </mesh>
                <mesh /* rotation-y={Math.PI * 0.23}  */ /* scale={[1.5, 1.5, 1.5]} */ position={[-4, 0, 0]}>
                    {/* <torusKnotGeometry />
            <meshNormalMaterial /> */}


                    <sphereBufferGeometry /* args={[1, 32, 32]} */ />
                    <meshStandardMaterial args={[
                        {
                            color: "orange",
                            /* wireframe: true */
                        }
                    ]} />
                    {/*  */}
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1.0} scale={10}>

                <planeGeometry />
                <meshStandardMaterial color={"purple"} />
            </mesh>

            <CustomObject />
        </>



    );
};

export default Experience;