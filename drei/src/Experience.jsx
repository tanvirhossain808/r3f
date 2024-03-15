import { MeshReflectorMaterial, Float, Text, Html, TransformControls, OrbitControls, PivotControls } from "@react-three/drei"
import { useRef } from "react"


export default function Experience() {
    const cubeRef = useRef(null)
    const sphereRef = useRef(null)
    return <>

        <OrbitControls makeDefault />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={4} axisColors={["#9381ff", "#ff4d6d", "#7ae582"]} scale={2}>
            <mesh position-x={- 2} ref={sphereRef}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    center
                    wrapperClass="label"
                    position={[1, 1, 0]}
                    distanceFactor={6}
                    occlude={[sphereRef, cubeRef]}
                >That's a sphere</Html>

            </mesh>
        </PivotControls>
        <mesh ref={cubeRef} scale={1.5} position-x={2}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cubeRef} /* position-x={2} */ >

        </TransformControls>
        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.85}
                color="greenYellow"
            />
        </mesh>
        <Float
            speed={5}
            floatIntensity={2}

        >
            <Text font="./bangers-v20-latin-regular.woff"
                color={"salmon"}
                fontSize={.5}
                position-y={2}
                maxWidth={2}
                textAlign="center"
            >
                r3f is running
            </Text>
        </Float>
    </>
}