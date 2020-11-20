import React, { useRef, useMemo } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { TweenMax } from 'gsap'

function Cube({ position, color, number, easter_egg, stop }) {
  const font = useLoader(THREE.FontLoader, './helvetiker_regular.typeface.json')
  const cube = useRef()

  const config = useMemo(
    () => ({ font, size: 0.5, height: 0.2, curveSegments: 10, bevelEnabled: false, bevelThickness: 0.1, bevelSize: 0.5, bevelOffset: 0, bevelSegments: 10 }),
    [font]
  )

  const coolNumber = (number) => {
    if(number.toString().length === 1){
      return `0${number}`
    }else{
      return number.toString()
    }
  }

  let count = 0
  useFrame(() => {
    if (stop === false) {
      cube.current.position.y = Math.sin(count)/10
      count += 0.1
    }
    else {
      TweenMax.to(cube.current.position, {
        duration: 0.3,
        y: 0,
      })
      count = 0
    }
  })

  if (easter_egg === number+1)
    return (
      <mesh
        position={position}
        ref={cube}
      >
        <sphereBufferGeometry args={[0.5, 10, 10]} />
        <meshLambertMaterial color={color} />
      </mesh>
    )
  else
    return (
      <group ref={cube}>
        <mesh
          position={[position[0]-0.4, position[1]+0.35, position[2]+0.2]}
          rotation={[-Math.PI/2,0,0]}
        >
          <textGeometry args={[coolNumber(number+1), config]}/>
          <meshLambertMaterial color={color} />
        </mesh>
        <mesh
          position={position}
        >
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={color} />
        </mesh>
      </group>
    )
}

export default Cube;
