import * as React from "react"
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ScrollScene, UseCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import { MeshDistortMaterial, GradientTexture } from '@react-three/drei'

function SpinningBoxSection() {
  const el = useRef()
  return (
    <section>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => <SpinningBoxWebGL {...props} />}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

function SpinningBoxWebGL({ scale, scrollState }) {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.y = scrollState.progress * Math.PI * 2
  })
  return (
    <group scale={scale.xy.min() * 0.5}>
      <mesh ref={mesh}>
        <boxGeometry />
        <meshNormalMaterial />
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
          <SpinningBoxSection />
        </article>
      )}
    </SmoothScrollbar>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Project Catalyst</title>
