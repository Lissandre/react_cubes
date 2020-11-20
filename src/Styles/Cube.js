import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'

function Cube({ position, color, number, easter_egg, stop }) {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)

  if (easter_egg === number+1)
    return (
      <mesh
        position={position}
        ref={mesh}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereBufferGeometry args={[0.5, 10, 10]} />
        <meshToonMaterial color={color} />
      </mesh>
    )
  else
    return (
      <mesh
        position={position}
        ref={mesh}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshToonMaterial color={color} />
      </mesh>
    )
}

export default Cube;
