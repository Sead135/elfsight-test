import { createGlobalStyle, styled } from 'styled-components'

import { Header, Main } from './components'

const App = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
      <GlobalStyle />
    </Wrapper>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`

const Wrapper = styled.div``
