import styled from 'styled-components'

type PProps = {
  height: number
}

export const CustomP = styled.div<PProps>`
font-size: ${({ height }) => height}px;
`
