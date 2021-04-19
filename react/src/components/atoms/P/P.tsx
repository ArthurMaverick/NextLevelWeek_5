import React, { ReactNode } from 'react'
import { CustomP } from './styled'

type PProps = {
  children: ReactNode
  height: number
}

export const P = (props: PProps) => {
  return (
    <CustomP height={props.height}>
      {props.children}
    </CustomP>
  )
}
