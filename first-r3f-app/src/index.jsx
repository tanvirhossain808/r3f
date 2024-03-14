import *as THREE from "three"
import { Canvas } from '@react-three/fiber'
import './style.css'
import ReactDOM from 'react-dom/client'
import { Mesh, MeshNormalMaterial, TorusKnotGeometry } from 'three'
import Experience from './Experience'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(

    <Canvas
        /*  dpr={[1, 2]} Default by r3b*/
        /* orthographic */
        // flat

        gl={
            {
                antialias: false,
                // toneMapping: THREE.CineonToneMapping
                toneMapping: THREE.ACESFilmicToneMapping,
                outputEncoding: THREE.LinearEncoding

            }
        }
        camera={{
            /*    zoom: 100, it is useful for the orthographic camera*/
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6]

        }}
    >
        <Experience />
    </Canvas>

)