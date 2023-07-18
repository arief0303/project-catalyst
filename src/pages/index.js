import * as React from "react"
import { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GlobalCanvas, ViewportScrollScene, ScrollScene, UseCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import { PivotControls, MeshTransmissionMaterial, Grid, Environment, PerspectiveCamera, CameraControls, Text, Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { Model } from '../components/Untitled'
import myFont from '../assets/fonts/XYBER_Regular.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
extend({ TextGeometry })

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

const TitleText = ({ el }) => {
  let size
  let font = "static/fonts/XYBER - Regular.otf"

  //if on mobile, resize text
  if (window.innerWidth < 600) {
    size = 0.35
  } else {
    size = 0.7
  }

  return <Text font={font} fontSize={size}>Catalyst</Text>
}

const ViewportDemoWebGL = ({ el }) => {
  

  return (
    /* Disable hideOffscreen to avoid jank */
    <ViewportScrollScene track={el} hideOffscreen={false}>
      {(props) => (
        <>
          <mesh position-y={0.5}>
            {/* <boxGeometry /> */}
            <TitleText />

            <Model rotation={[0, 180, 0]} scale={0.4} />

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
          <Environment preset="dawn" />
          <PerspectiveCamera fov={14} position={[0, 0, 20]} makeDefault onUpdate={(self) => self.lookAt(0, 0, 0)} />
          {/* OrbitControls add touchAction='none' to the canvas eventSource and never removes it after events.connected changes it 
              - need to manually pass in tracked domElement to keep touch scrolling working */}
          {/* <OrbitControls domElement={props.track.current} makeDefault enableZoom={false} /> */}
          {/* <CameraControls makeDefault /> */}
        </>
      )}
    </ViewportScrollScene>
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
            {/* <header>
              <h1>Project Catalyst</h1>
            </header>
            <section>
              <h1>Basic &lt;ScrollScene/&gt; example</h1>
            </section> */}
            {/* {isTouch && (
              <section>
                <p style={{ color: 'orange' }}>
                  You are on a touch device which means the WebGL won't sync with the native scroll. Consider disabling ScrollScenes for
                  touch devices, or experiment with the `smoothTouch` setting on Lenis.
                </p>
              </section>
            )}
            <section>Both these ScrollScenes are tracking DOM elements and scaling their WebGL meshes to fit.</section> */}
            <ViewportDemo />
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </article>
        )}
      </SmoothScrollbar>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Project Catalyst</title>
