
const Experience = () => {


    return (
        <>
            <mesh /* rotation-y={Math.PI * 0.23} position={[2, 0, 0]} */ /* scale={[1.5, 1.5, 1.5]} */ position-x={2}>
                {/* <torusKnotGeometry />
            <meshNormalMaterial /> */}


                {/* <sphereBufferGeometry args={[1.5, 32, 32]} /> */}
                <boxGeometry scale={1.5} />
                <meshBasicMaterial args={[
                    {
                        color: "red",
                        /* wireframe: true */
                    }
                ]} />

            </mesh>
            <mesh /* rotation-y={Math.PI * 0.23}  */ /* scale={[1.5, 1.5, 1.5]} */ position={[-4, 0, 0]}>
                {/* <torusKnotGeometry />
            <meshNormalMaterial /> */}


                <sphereBufferGeometry args={[1, 32, 32]} />
                <meshBasicMaterial args={[
                    {
                        color: "orange",
                        /* wireframe: true */
                    }
                ]} />

            </mesh>
            <mesh rotation-x={Math.PI * 0.25} position-y={-1.50}>

                <planeGeometry args={[9, 4]} />
                <meshBasicMaterial color={"red"} />
            </mesh>
        </>



    );
};

export default Experience;