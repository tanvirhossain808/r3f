import { TransformControls, OrbitControls, PivotControls } from "@react-three/drei"
import { useRef } from "react"


export default function Experience() {
    const cubeRef = useRef(null)
    return <>

        <OrbitControls makeDefault />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={4} axisColors={["#9381ff", "#ff4d6d", "#7ae582"]} scale={2}>
            <mesh position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
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
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}