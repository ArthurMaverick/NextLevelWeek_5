import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
// import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { api } from '../../components/services/api'
import { convertoToString } from '../../util/convertyDurationToTimeString'
import styles from './episode.module.scss'
import Image from 'next/image'

type Episodes = {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  durationAsString: string
  description: string
  url: string
}
interface EpisodeProps {
  episode: Episodes[]
}

export default function DinamicEpisodes({ episode }: EpisodeProps): JSX.Element {
  return (
    <div className={styles.episode}>
      <div>
        <Link href={'/'} >
        <button type="button">
          <img src="/arrow-left.svg" alt="back"/>
        </button>
        </Link>
        <Image width="700" height="160" src={episode.thumbnail} objectFit='cover'/>
        <button type="button">
          <img src="/play.svg" alt="tocar episodeo"/>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }}/>

    </div>
  )
}

export const getStaticProps: GetStaticProps = async(ctx) => {
  const { slug } = await ctx.params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = data.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(data.file.duration),
      durationAsString: convertoToString(Number(data.file.duration)),
      description: data.description,
      url: data.file.url

    }
  })

  return {
    props: { episode },
    revalidate: 60 * 60 * 24
  }
}
