import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { Header, Player } from '../components'
import { PlayerContextProvider } from '../contexAPI/PlayerContext'
import styles from '../styles/app.module.scss'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
      </PlayerContextProvider>
  )
}

export default MyApp
