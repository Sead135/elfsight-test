import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const DEFAULT_VISIBLE_COUNT = 4

export const EpisodeGrid = ({ urls }) => {
  const gridRef = useRef(null)
  const [episodes, setEpisodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT)

  useEffect(() => {
    const fetchEpisodes = async () => {
      const urlsToFetch = urls.slice(episodes.length, visibleCount)
      setIsLoading(true)
      try {
        const episodeResponses = await Promise.all(
          urlsToFetch.map((url) => fetch(url).then((res) => res.json()))
        )
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...episodeResponses])
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    if (urls.length && episodes.length < urls.length) {
      fetchEpisodes()
    }
  }, [visibleCount, urls])

  useEffect(() => {
    if (gridRef.current && !isLoading) {
      gridRef.current.scrollTo(0, gridRef.current.scrollHeight)
    }
  }, [isLoading])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prevCount) => prevCount + DEFAULT_VISIBLE_COUNT)
  }, [])

  return (
    <>
      <Grid ref={gridRef}>
        {episodes.map((episode) => (
          <GridItem key={episode.id}>
            <Title>{episode.name}</Title>
            <Subtitle>{episode.episode}</Subtitle>
          </GridItem>
        ))}
      </Grid>
      {!isLoading && episodes.length < urls?.length && (
        <LoadMore onClick={handleLoadMore}>Load More</LoadMore>
      )}

      {isLoading && <Subtitle>Loading...</Subtitle>}
    </>
  )
}

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 4px;
  margin-bottom: 8px;
  max-height: 300px;
  overflow-y: scroll;
`

const GridItem = styled.div`
  position: relative;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(17, 17, 17, 0.2);
  font-size: 9px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Title = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;
`

const Subtitle = styled.div`
  width: 100%;
  text-align: center;
`

const LoadMore = styled.button`
  padding: 5px 20px;
  border: 1px solid rgba(17, 17, 17, 0.2);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
`

EpisodeGrid.propTypes = {
  urls: PropTypes.array.isRequired,
};