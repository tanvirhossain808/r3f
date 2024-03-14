import { Canvas } from '@react-three/fiber'
import './style.css'
import ReactDOM from 'react-dom/client'
import { Mesh, MeshNormalMaterial, TorusKnotGeometry } from 'three'
import Experience from './Experience'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(

    <Canvas>
        <Experience />
    </Canvas>

)