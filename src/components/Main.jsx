import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { FilterBar } from './FilterBar'
import { Popup } from './Popup'
import {useRickAndMortyData} from '../hook'
import { getStatusColor } from '../utils'

export const Main = () => {
  const { data, isLoading, isNextPage, loadNextPage, filterData } =
    useRickAndMortyData()
  const [filterSettings, setFilterSettings] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [popupData, setPopupData] = useState({})

  const closePopup = () => {
    setShowPopup(false)
    document.body.style.overflow = 'auto'
    setPopupData({})
  }

  const openPopup = (data) => {
    setShowPopup(true)
    document.body.style.overflow = 'hidden'
    setPopupData(data)
  }

  useEffect(() => {
    if (filterSettings.length !== 0 || filterSettings === 'clear-all') {
      filterData(filterSettings)
    }
  }, [filterSettings])

  return (
    <Container>
      <Hero>
        <BigTitle>The Rick and Morty</BigTitle>
      </Hero>
      <Content>
        <FilterBar setFilterSettings={setFilterSettings} />
        <Grid>
          {!isLoading && data.length === 0 ? (
            <Message>Not Found</Message>
          ) : (
            data.map((data) => {
              const statusColor = getStatusColor(data.status)
              return (
                <GridItem
                  key={`${data.id}-${data.name}`}
                  onClick={() => openPopup(data)}
                >
                  <ImageContainer>
                    <Image src={data.image} />
                  </ImageContainer>
                  <GridTitle>{data.name}</GridTitle>
                  <GridType>{data.species}</GridType>
                  <GridStatus $status={statusColor} />
                </GridItem>
              )
            })
          )}
        </Grid>

        {isLoading ? (
          <Loading>Please wait...</Loading>
        ) : isNextPage ? (
          <ButtonContainer>
            <Button onClick={loadNextPage}>Load More</Button>
          </ButtonContainer>
        ) : (
          ''
        )}
      </Content>
      {showPopup && <Popup data={popupData} closePopup={closePopup} />}
    </Container>
  )
}

const Container = styled.div``

const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
`

const BigTitle = styled.h1`
  margin: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(39, 43, 51);
  padding: 0 0 20px;
`

const Grid = styled.div`
  margin: 20px;
  width: calc(100% - 40px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`

const GridItem = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background-color: rgb(60, 62, 68);
  cursor: pointer;
  &:hover img {
    transform: scale(1.1);
  }
`

const GridStatus = styled.span`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  background-color: ${({ $status }) => $status};
`

const Message = styled.h3`
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
`

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  border-radius: 5px;
`

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: 0.3s;
`

const GridTitle = styled.h3`
  font-size: 20px;
  color: #ffffff;
  font-weight: 500;
  margin: 10px 0;
`

const GridType = styled.span`
  font-size: 16px;
  color: #f0f0f0;
  font-weight: 300;
`

const Loading = styled.span`
  font-size: 18px;
  width: 100%;
  color: #ffffff;
  text-align: center;
  font-weight: 700;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  padding: 5px 20px;
  border: 2px solid #ffffff;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
`
