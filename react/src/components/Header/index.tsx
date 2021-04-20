import React from 'react'
import styles from './styles.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcast"/>
      <p>O melhor do melhor do melhor</p>
      <span>{currentDate}</span>
    </header>
  )
}
