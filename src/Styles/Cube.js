import React, { useRef, useMemo } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { TweenMax } from 'gsap'

function Cube({ position, color, number, easter_egg, stop }) {
  const font = useLoader(THREE.FontLoader, './helvetiker_regular.typeface.json')
  const cube = useRef()
  const egg = useRef()
  const light = useRef()

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
    if(number === 17) {
      egg.current.rotation.y += 0.01
      light.current.target = egg.current
    }
  })

  
  let points = []
  for ( let deg = 0; deg <= 180; deg += 6 ) {
    const rad = Math.PI * deg / 180
    const point = new THREE.Vector2( ( 0.72 + .08 * Math.cos( rad ) ) * Math.sin( rad ), - Math.cos( rad ) )
    points.push( point )
  }
  return (
    <group ref={cube}>
      {easter_egg === number &&
        <group position={[position[0], position[1]+1, position[2]]}>
            <mesh
              scale={[0.4, 0.4, 0.4]}
              rotation={[0,-Math.PI/25,-Math.PI/10]}
              ref={egg}
              castShadow
            >
              <latheBufferGeometry args={[points, 32]} />
              <meshLambertMaterial color={color} emissive={'#ffd700'} emissiveIntensity={0.8}/>
            </mesh>
            <spotLight ref={light} translateY={20} angle={Math.PI/8} intensity={5} color={'#ffffff'} castShadow/>
        </group>
      }
      <mesh
        position={[position[0]-0.4, position[1]+0.35, position[2]+0.2]}
        rotation={[-Math.PI/2,0,0]}
        receiveShadow
      >
        <textGeometry args={[coolNumber(number), config]}/>
        <meshLambertMaterial color={color} emissive={color} emissiveIntensity={0.02}/>
      </mesh>
      <mesh
      position={position}
      receiveShadow
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={color} emissive={color} emissiveIntensity={0.06} />
    </mesh>
  </group>
  )
}

export default Cube;
