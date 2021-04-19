/* eslint-disable no-mixed-operators */
import { ReactNode } from 'react'
import { CustomButton } from './styles'

type Buttonprops = {
  type: 'button' | 'submit' | 'reset' | undefined
  children: ReactNode
  color: string
  size: string
}

const sizes = {
  small: {
    width: 60,
    heigth: 30
  },
  medium: {
    width: 80,
    heigth: 30
  },
  large: {
    width: 100,
    heigth: 30
  }
}

export const Button = (props: Buttonprops) => {
  function getProps () {
    if (props.size === 'small') return sizes.small
    if (props.size === 'medium') return sizes.medium
    if (props.size === 'large') return sizes.large
  }

  return (
    <CustomButton
      color={props.color}
      type={props.type}
      size={getProps()}
    >
      {props.children}
    </CustomButton>
  )
}
