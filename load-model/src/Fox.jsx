import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

const Fox = () => {


    const fox = useGLTF("./Fox/glTF/Fox.gltf")
    const animation = useAnimations(fox.animations, fox.scene)
    const { animationName } = useControls({
        animationName: { options: animation.names }

    })
    useEffect(() => {
        const action = animation.actions[animationName]
        action.reset().fadeIn(0.5).play()
        return () => {
            action.fadeOut(0.5)
        }
        // window.setTimeout(() => {
        //     animation.actions.Walk.play()
        //     animation.actions.Walk.crossFadeFrom(animation.actions.Run, 1)
        // }, 2000)
        // console.log("hey");
    }, [animationName])
    return (
        <primitive object={fox.scene} scale={0.02} position={[-2.5, 0, 2.5]} />
    );
};

export default Fox;