/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.8 untitled.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/untitled.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    console.log('animations', animations)
    actions.KeyAction.play()
 });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Icosphere" geometry={nodes.Icosphere.geometry} material={materials['Material.001']} morphTargetDictionary={nodes.Icosphere.morphTargetDictionary} morphTargetInfluences={nodes.Icosphere.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload('/untitled.glb')