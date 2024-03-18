import { useGLTF, Clone } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const Model = () => {
    // const model = useLoader(GLTFLoader, "./hamburger-draco.glb", /* "./FlightHelmet/glTF/FlightHelmet.gltf", */

    //     (loader) => {
    //         const dracoLoader = new DRACOLoader
    //         dracoLoader.setDecoderPath("./draco/")
    //         loader.setDRACOLoader(dracoLoader)
    //     }
    // )
    const model = useGLTF("./hamburger.glb")

    return (
        /*   <primitive object={model.scene} scale={0.35} */  /* scale={5} position={-1} */ /* /> */
        <Clone object={model.scene} scale={0.35} />

    );
};

export default Model;