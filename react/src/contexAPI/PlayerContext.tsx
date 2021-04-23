/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData ={
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  play: (episodes: Episode) => void
  togglePlay: () => void
  setisPlayingState: (state: boolean) => void
  playList: (list: Episode[], index: number) => void
  playBack: () => void
  playNext: () => void
  toggleLoop: () => void
  toggleShuffling: () => void
  clearPlayerState: () => void
  hasNext: boolean
  hasPrevious: boolean
}

type ChildrenProps= {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: ChildrenProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0)
  const [isPlaying, setisPlaying] = useState<boolean>(false)
  const [isLooping, setisLooping] = useState<boolean>(false)
  const [isShuffling, setisShuffling] = useState<boolean>(false)
  function play (episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setisPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setisPlaying(true)
  }

  function togglePlay() {
    setisPlaying(!isPlaying)
  }

  function toggleLoop() {
    setisLooping(!isLooping)
  }

  function toggleShuffling() {
    setisShuffling(!isShuffling)
  }

  function setisPlayingState(state: boolean) {
    setisPlaying(state)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  const hasPrevious = currentEpisodeIndex > 0

  function playNext() {
    if (isShuffling) {
      const nextRandomEp = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEp)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playBack() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider value={{
      currentEpisodeIndex,
      episodeList,
      isPlaying,
      hasPrevious,
      hasNext,
      play,
      playBack,
      playNext,
      playList,
      togglePlay,
      setisPlayingState,
      toggleLoop,
      toggleShuffling,
      clearPlayerState,
      isShuffling,
      isLooping
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
