import { ADD_CUBE, SHUFFLE, CHANGE_ODD, STOP_ODD } from '../constants/actions';

export const stateInit = {
  number: 0,
  cubes: [],
  easter_egg: 5,
}

export const reducer = (state = stateInit, action = {}) => {
  let cubes
  switch(action.type){
    case ADD_CUBE :
      const cube = {
        color: "#"+((1<<24)*Math.random()|0).toString(16),
        number: state.number,
        stop: false,
      }
      return {
        ...state,
        cubes : state.cubes.concat(cube),
        number: state.number + 1,
      }
    case SHUFFLE:
      cubes = state.cubes.map( cube => ({ ...cube })   )
      cubes.sort(() => Math.random() - 0.5)
      return {
        ...state,
        cubes
      }
    case CHANGE_ODD:
      cubes = state.cubes.map((cube) => {
        if (cube.number % 2 === 1) cube.stop = false
        return { ...cube }
      })
      return {
        ...state,
        cubes,
      }
    case STOP_ODD:
      cubes = state.cubes.map((cube) => {
        if (cube.number % 2 === 1) cube.stop = true
        return { ...cube }
      })
      return {
        ...state,
        cubes,
      }
    default:
      return state
  }
}