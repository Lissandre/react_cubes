import { ADD_CUBE, SHUFFLE, CHANGE_ODD, STOP_ODD } from '../constants/actions';

export const add_cube = () => {
  return {
    type : ADD_CUBE
  }
}

export const shuffle = () => {
  return {
    type : SHUFFLE
  }
}

export const change_odd = () => {
  return {
    type : CHANGE_ODD
  }
}

export const stop_odd = () => {
  return {
    type : STOP_ODD
  }
}