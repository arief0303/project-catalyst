import * as React from "react"
import { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GlobalCanvas, ViewportScrollScene, ScrollScene, UseCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import { PivotControls, MeshTransmissionMaterial, Grid, Environment, PerspectiveCamera, CameraControls } from '@react-three/drei'
import * as THREE from 'three'
import {Model} from '../components/Untitled'

const ViewportDemo = () => {
  const el = useRef()
  return (
    <>
      <div ref={el} className="Placeholder ViewportScrollScene" style={{ touchAction: 'pan-x' }}></div>
      <UseCanvas>
        <ViewportDemoWebGL el={el} />
      </UseCanvas>
    </>
  )
}

const ViewportDemoWebGL = ({ el }) => {
  return (
    /* Disable hideOffscreen to avoid jank */
    <ViewportScrollScene track={el} hideOffscreen={false}>
      {(props) => (
        <>
          <PivotControls scale={1.5} depthTest={true} lineWidth={2.5} disableSliders>
            <mesh position-y={0.5}>
              <boxGeometry />
              <MeshTransmissionMaterial
                chromaticAberration={1}
                thickness={0.3}
                transmission={1}
                anisotropy={0.5}
                distortion={5}
                distortionScale={1.5}
                temporalDistortion={0.1}
                metalness={0.1}
                backside
                resolution={256}
                backsideResolution={256}
              />
            </mesh>
          </PivotControls>
          <Grid position={[0, 0.0, 0]} args={[30, 30]} scale={0.5} fadeDistance={14} />
          <Environment preset="dawn" />
          <color args={[0x088]} attach="background" />
          <PerspectiveCamera fov={14} position={[6, 8, 6]} makeDefault onUpdate={(self) => self.lookAt(0, 0, 0)} />
          {/* OrbitControls add touchAction='none' to the canvas eventSource and never removes it after events.connected changes it 
              - need to manually pass in tracked domElement to keep touch scrolling working */}
          {/* <OrbitControls domElement={props.track.current} makeDefault enableZoom={false} /> */}
          <CameraControls makeDefault />
        </>
      )}
    </ViewportScrollScene>
  )
}

function ScrollSection() {
  const el = useRef()
  return (
    <section>
      <div ref={el} className="Placeholder ScrollScene Title"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => <ModelView {...props} />}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

function ModelView({ scale, scrollState }) {
  const mesh = useRef()
  // const model = useLoader(GLTFLoader, "/untitled.glb");
/*   const [color, setColor] = useState("red");

  // Here's the animation part
  // ************************* 
  let mixer
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach(clip => {
      const action = mixer.clipAction(clip)
      action.play();
    });
  } */
  useFrame((state, delta) => {
    // mesh.current.rotation.y = scrollState.progress * Math.PI * 2
    // mixer?.update(delta)
  })
  return (
    <group scale={scale.xy.min() * 0.5}>
      <Environment preset="dawn" />

      <mesh ref={mesh}>
        <Model scale={0.4} rotation={[0, 180, 0]} />
        {/* <primitive color={color} object={model.scene} scale={0.4} /> */}
      </mesh>
    </group>
  )
}

const IndexPage = () => {
  const [isTouch, setTouch] = useState(false)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    setTouch(isTouch)
  }, [])
  return (
    <>
      <SmoothScrollbar>
        {(bind) => (
          <article {...bind}>
            <header>
              <h1>Project Catalyst</h1>
            </header>
            <section>
              <h1>Basic &lt;ScrollScene/&gt; example</h1>
            </section>
            {isTouch && (
              <section>
                <p style={{ color: 'orange' }}>
                  You are on a touch device which means the WebGL won't sync with the native scroll. Consider disabling ScrollScenes for
                  touch devices, or experiment with the `smoothTouch` setting on Lenis.
                </p>
              </section>
            )}
            <section>Both these ScrollScenes are tracking DOM elements and scaling their WebGL meshes to fit.</section>
            <ScrollSection />
            <ViewportDemo />
          </article>
        )}
      </SmoothScrollbar>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Project Catalyst</title>
