import { GetServerSideProps } from 'next'
export default function Home (): JSX.Element {
  return (
          <h1>Index</h1>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch('http://localhost:3000/episodes')
  const json = await data.json()

  return {
    props: {
      episodes: json
    },
    revalidate: 60 * 60 * 8
  }
}
