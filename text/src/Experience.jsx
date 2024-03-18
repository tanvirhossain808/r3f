import { Text3D, OrbitControls, Center, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { MeshNormalMaterial } from 'three'
import *as THREE from "three"
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()
export default function Experience() {
    const donuts = useRef([])
    // const donutGroup = useRef()
    // console.log(donutGroup);
    const [matcapTexture] = useMatcapTexture("9C5B3B_49200A_E9C8AB_DDAB7D", 256)
    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true
        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    // const [torusGeometry, setorusGeometry] = useState()
    // const [material, setMaterial] = useState()
    // console.log(torusGeometry)

    // const tempArray = [...Array(100)]
    // tempArray.map(() => {

    // }, [])

    // console.log(tempArray);
    useFrame((state, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.1

        }

    })
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />
        {/* <torusGeometry ref={setorusGeometry} args={[1, 0.6, 16, 32]} /> */}
        {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
        {/*   <mesh scale={1.5}>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}
        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json" size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}

            >
                Hello R3F
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
        </Center>
        {/*         <group ref={donutGroup}>
 */}            {[...Array(100)].map((value, index) => <mesh
            ref={(element) => donuts.current[index] = element}
            key={index}
            geometry={torusGeometry}
            material={material}
            position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,

            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={
                [

                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0

                ]
            }

        />
            // {/* <torusGeometry ref={setorusGeometry} args={[1, 0.6, 16, 32]} /> */ }

            // {/* </mesh> */ }
        )}
        {/*        </group>
 */}
    </>
}