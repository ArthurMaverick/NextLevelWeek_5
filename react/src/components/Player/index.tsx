/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext,useRef, useEffect } from 'react'
import { PlayerContext } from '../../contexAPI/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
export const Player = () => {
  const { episodeList,currentEpisodeIndex, isPlaying, togglePlay, setisPlayingState } = useContext(PlayerContext)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play()
    else audioRef.current.pause()
  },[isPlaying])

  const episode = episodeList[currentEpisodeIndex]
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando agora"/>
        <strong>Tocando agora  </strong>
      </header>

      {episode
        ? (
          <div className={styles.currentEpisode}>
            <Image width={592} height={792} src={episode.thumbnail} objectFit='cover'></Image>
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
          )
        : (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
         </div>

          )}

      <footer className={!episode && styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode
              ? (
                  <Slider
                  trackStyle={{ backgroundColor: '#04d361' }}
                  railStyle={{ backgroundColor: '#9f75ff' }}
                  handleStyle={{ backgroundColor: '#04d361', borderWidth: 4 }}
                  />
                )
              : (
              <div className={styles.emptySlider} />
                )
          }
          </div>
          <span>00:00</span>
        </div>

        {episode && (

          <audio src={episode.url} autoPlay ref={audioRef} onPlay={() => setisPlayingState(true)} onPause={() => setisPlayingState(false)}/>
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="tocar anterior"/>
          </button>
          <button type="button" disabled={!episode} onClick={togglePlay}>
            {isPlaying
              ? <img className={styles.playButton} src='pause.svg' alt='pause'/>
              : <img className={styles.playButton} src="play.svg" alt="tocar"/>
          }

          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="tocar proxima"/>
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="repetir"/>
          </button>
        </div>
      </footer>
    </div>
  )
}
