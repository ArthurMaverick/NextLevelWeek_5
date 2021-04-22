/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext } from 'react'

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
  play: (episodes: Episode) => void
  togglePlay: () => void
  setisPlayingState: (state: boolean) => void
}
export const PlayerContext = createContext({} as PlayerContextData)
