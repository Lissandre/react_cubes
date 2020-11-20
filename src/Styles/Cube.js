import React, { useRef, useState, useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'

function Cube({ position, color, number, easter_egg, stop }) {
  const font = useLoader(THREE.FontLoader, './helvetiker_regular.typeface.json')
  const config = useMemo(
    () => ({ font, size: 0.5, height: 0.2, curveSegments: 10, bevelEnabled: false, bevelThickness: 0.1, bevelSize: 0.5, bevelOffset: 0, bevelSegments: 10 }),
    [font]
  )
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  console.log(position);

  const coolNumber = (number) => {
    if(number.toString().length === 1){
      return `0${number}`
    }else{
      return number.toString()
    }
  }

  if (easter_egg === number+1)
    return (
      <mesh
        position={position}
        ref={mesh}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereBufferGeometry args={[0.5, 10, 10]} />
        <meshLambertMaterial color={color} />
      </mesh>
    )
  else
    return (
      <group>
        <mesh
          position={[position[0]-0.4, position[1]+0.35, position[2]+0.2]}
          rotation={[-Math.PI/2,0,0]}
        >
          <textGeometry args={[coolNumber(number), config]}/>
          <meshLambertMaterial color={color} />
        </mesh>
        <mesh
          position={position}
          ref={mesh}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color={color} />
        </mesh>
      </group>
    )
}

export default Cube;
