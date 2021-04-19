import React, { ReactNode } from 'react'
import { CustomH1 } from './styled'

type H1Props = {
  children: ReactNode
  size: number
  Weigth: number
}
export const H1 = (props: H1Props) => {
  return (
    <CustomH1
    fontSize={props.size}
    fontWeigth={props.Weigth}
    >
      {props.children}
    </CustomH1>
  )
}
