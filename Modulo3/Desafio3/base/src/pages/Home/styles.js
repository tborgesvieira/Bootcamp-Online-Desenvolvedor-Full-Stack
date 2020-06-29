import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto 10px;
  padding: 0 10px;

  display: flex;
  flex-direction: column;
`

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 50px 0;

  & input:first-child {
    margin-left: 0;
  }

  & input:nth-child(3) {
    margin-right: 0;
  }

  @media (max-width: 620px) {
    flex-direction: column;

    input {
      margin: 10px 0;
    }
  }
`
