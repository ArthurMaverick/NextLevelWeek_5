import styled from 'styled-components'

interface H1Props {
  fontSize: number
  fontWeigth: number
}

export const CustomH1 = styled.h1<H1Props>`
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => props.fontWeigth}px;
`
