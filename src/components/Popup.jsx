import ReactDOM from 'react-dom'
import { styled } from 'styled-components'
import { getStatusColor } from '../utils/getStatusColor'

export const Popup = ({ data, closePopup }) => {
  const statusColor = getStatusColor(data.status)
  return ReactDOM.createPortal(
    <>
      <Container>
        <Close onClick={closePopup}>x</Close>
        <Image src={data.image} alt={data.name} />
        <Content>
          <Title>{data.name}</Title>

          <Category>
            <Status $status={statusColor}>{data.status}</Status>
            <span>–</span>
            <Species>{data.species}</Species>
          </Category>

          <Gender>
            <Subtitle>Gender:</Subtitle>
            <Description>{data.gender}</Description>
          </Gender>

          {data.location.name && (
            <Location>
              <Subtitle>Last known location:</Subtitle>
              <Description>{data.location.name}</Description>
            </Location>
          )}

          {data.origin.name && (
            <Seen>
              <Subtitle>First seen in:</Subtitle>
              <Description>{data.origin.name}</Description>
            </Seen>
          )}

          {data.type && (
            <Type>
              <Subtitle>Type:</Subtitle>
              <Description>{data.type}</Description>
            </Type>
          )}
        </Content>
      </Container>
      <Background />
    </>,
    document.body
  )
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 20px), -50%);
  display: flex;
  align-items: flex-start;
  max-width: min(calc(100% - 80px), 650px);
  width: 100%;
  margin: 20px;
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  z-index: 999;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  padding: 5px 10px;
  border-radius: 50%;
  border: 1px solid #000000;
  background-color: transparent;
  cursor: pointer;

  @media (max-width: 480px) {
    background-color: #ffffff;
  }
`

const Image = styled.img`
  width: 50%;
  border-radius: 10px;
  @media (max-width: 480px) {
    width: 100%;
  }
`

const Content = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 20px;

  @media (max-width: 480px) {
    width: 100%;
    margin: 10px 0 0 0;
  }
`

const Title = styled.h2`
  margin: 0 0 30px 0;
  font-size: 24px;
  font-weight: 700;
`

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 700;
`

const Description = styled.div``

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`

const Status = styled.span`
  color: ${({ $status }) => $status};
`

const Species = styled.span``

const Gender = styled.div`
  margin-bottom: 14px;
`

const Location = styled.div`
  margin-bottom: 14px;
`

const Seen = styled.div`
  margin-bottom: 14px;
`

const Type = styled.div`
  margin-bottom: 14px;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #808080;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  z-index: 2;
`
