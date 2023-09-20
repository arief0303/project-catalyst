import * as React from "react"
import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GlobalCanvas, ViewportScrollScene, ScrollScene, UseCanvas, SmoothScrollbar, useTracker } from '@14islands/r3f-scroll-rig'
import { PivotControls, MeshTransmissionMaterial, Grid, Environment, PerspectiveCamera, CameraControls, Text, Text3D, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Model } from '../components/Untitled'
import myFont from '../assets/fonts/XYBER_Regular.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import '@14islands/r3f-scroll-rig/css'
import { useTrackerMotionValue } from '../components/useTrackerMotionValue'
import { motion, useTransform } from 'framer-motion'
import { WaveMaterial } from '../components/WaveMaterial'
import { easing } from 'maath'
import axios from "axios";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
extend({ TextGeometry })

const ShaderPlane = ({ vertex, fragment }) => {
  const meshRef = useRef();

  // Load the noise texture and update the shader uniform
  const noiseTexture = useTexture("noise2.png");
  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    // start from 20 to skip first 20 seconds ( optional )
    meshRef.current.material.uniforms.iTime.value = time + 20;
  });

  // Define the shader uniforms with memoization to optimize performance
  const uniforms = useMemo(
    () => ({
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(4, 3),
      },
      iChannel0: {
        type: "t",
        value: noiseTexture,
      },
    }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const ViewportDemo = () => {
  const el = useRef()
  return (
    <>
      <section ref={el} className="TitleArea Debug">
        <div ref={el} className="Placeholder ViewportScrollScene" style={{ touchAction: 'pan-x' }}></div>
        <UseCanvas>
          <ViewportDemoWebGL el={el} />
        </UseCanvas>
      </section>
    </>
  )
}

const ViewportDemoWebGL = ({ el }) => {
  // State variables to store the vertex and fragment shaders as strings
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  // Fetch the shaders once the component mounts
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder 
    axios.get("/vertexShader.glsl").then((res) => setVertex(res.data));
    axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);

  // If the shaders are not loaded yet, return null (nothing will be rendered)
  if (vertex == "" || fragment == "") return null;

  return (
    /* Disable hideOffscreen to avoid jank */
    <ViewportScrollScene track={el} hideOffscreen={false}>
      {(props) => (
        <>
          <mesh position-y={0.5}>
            {/* <boxGeometry /> */}
            <TitleText />

            <ShaderPlane vertex={vertex} fragment={fragment} />

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

const TitleText = ({ el }) => {
  let size
  let font = "/fonts/XYBER - Regular.otf"

  //if on mobile, resize text
  if (window.innerWidth < 600) {
    size = 0.35
  } else {
    size = 0.7
  }

  return <Text font={font} fontSize={size}>Catalyst</Text>
}

/* function ShaderPlane() {
  const ref = useRef()
  const { viewport, size } = useThree()
  useFrame((state, delta) => {
    ref.current.time += delta
    easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
  })
  return (
    <mesh scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry />
      <waveMaterial ref={ref} key={WaveMaterial.key} resolution={[size.width * viewport.dpr, size.height * viewport.dpr]} />
    </mesh>
  )
} */

function HorizontalMarquee() {
  const el = useRef()
  const tracker = useTracker(el)
  const progress = useTrackerMotionValue(tracker)

  const x = useTransform(progress, [0, 1], ['0vw', '-50vw'])

  return (
    <section ref={el} className="Marquee Debug">
      <motion.div style={{ x }}>
        <h1>TEXT BIG TEXT BIG TEXT</h1>
      </motion.div>
    </section>
  )
}

function VerticalParallax({ children }) {
  const el = useRef()
  const tracker = useTracker(el)
  const progress = useTrackerMotionValue(tracker)

  const textY = useTransform(progress, [0, 1], ['25%', '-25%'])
  const imageY = useTransform(progress, [0, 1], ['-25vh', '25vh'])

  return (
    <section ref={el} className="VerticalParallax Debug">
      <motion.div className="VerticalParallaxMotion" style={{ y: textY }}>
        <h2>{children}</h2>
      </motion.div>
      <motion.div className="Image" style={{ y: imageY }}></motion.div>
    </section>
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
            <ViewportDemo />

            {/* <header>@14islands/r3f-scroll-rig + Framer Motion</header> */}

            <section>
              {/* <h1>HTML parallax with useTracker() and Framer Motion</h1> */}
            </section>

            <section>
              {/* <p>
                The <code>useTracker()</code> can be used by regular HTML components to get their progress through the viewport.
              </p> */}
            </section>

            {/* <section>&nbsp;</section> */}


            <VerticalParallax>Vertical Text</VerticalParallax>

            <section>
              <p>In this example, we take the scroll progress from the tracker and feed it into a MotionValue.</p>
            </section>

            <HorizontalMarquee>R3F Scroll Rig</HorizontalMarquee>

            <section>&nbsp;</section>
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

            <section>&nbsp;</section>
          </article>
        )}
      </SmoothScrollbar>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Project Catalyst</title>
