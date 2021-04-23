/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext,useRef, useEffect, useState } from 'react'
import { PlayerContext } from '../../contexAPI/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'
import { convertoToString } from '../../util/convertyDurationToTimeString'
import 'rc-slider/assets/index.css'
export const Player = () => {
  const { clearPlayerState, toggleShuffling,isShuffling,toggleLoop,isLooping ,episodeList,currentEpisodeIndex, isPlaying, togglePlay, setisPlayingState, playBack,playNext,hasNext,hasPrevious } = useContext(PlayerContext)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play()
    else audioRef.current.pause()
  },[isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek (amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleSound() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

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
          <span>{convertoToString(progress)}</span>
          <div className={styles.slider}>
            {episode
              ? (
                  <Slider
                  max={episode.duration}
                  value={progress}
                  onChange={handleSeek}
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
          <span>{convertoToString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (

          <audio
          src={episode.url}
          onLoadedMetadata={setupProgressListener}
          autoPlay
          onEnded={handleSound}
          ref={audioRef}
          loop={isLooping}
          onPlay={() => setisPlayingState(true)}
          onPause={() => setisPlayingState(false)}/>
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleShuffling} className={isShuffling ? styles.isActive : ''}>
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button type="button" disabled={!episode || !hasPrevious} onClick={playBack}>
            <img src="/play-previous.svg" alt="tocar anterior"/>
          </button>
          <button type="button" disabled={!episode} onClick={togglePlay}>
            {isPlaying
              ? <img className={styles.playButton} src='pause.svg' alt='pause'/>
              : <img className={styles.playButton} src="play.svg" alt="tocar"/>
          }

          </button>
          <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
            <img src="/play-next.svg" alt="tocar proxima"/>
          </button>
          <button type="button"
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}>
            <img src="/repeat.svg" alt="repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
