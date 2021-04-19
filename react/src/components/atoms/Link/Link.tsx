import Link, { LinkProps } from 'next/link'

import React, { ReactNode } from 'react'

interface CustonLink extends LinkProps {
  children: ReactNode
}

export default (props: CustonLink) => {
  return (
    <Link href={props.href}>
      {props.children}
    </Link>
  )
}
