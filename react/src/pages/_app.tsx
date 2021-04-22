import '../styles/globals.scss'

import { AppProps } from 'next/app'
import { Header, Player } from '../components'

import styles from '../styles/app.module.scss'
import { PlayerContext } from '../contexAPI/PlayerContext'
import { useState } from 'react'
function MyApp ({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setisPlaying] = useState(false)

  function play (episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setisPlaying(true)
  }

  function togglePlay() {
    setisPlaying(!isPlaying)
  }

  function setisPlayingState(state: boolean) {
    setisPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setisPlayingState }}>
      <div className={styles.wrapper}>
        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
