import styled from 'styled-components'

interface CustomProps {
  color: string
  size: any
}

export const CustomButton = styled.button<CustomProps>`
width: ${(props) => props.size.width}px;
height: ${(props) => props.size.heigth}px;
background-color: ${(props) => props.color};

`
