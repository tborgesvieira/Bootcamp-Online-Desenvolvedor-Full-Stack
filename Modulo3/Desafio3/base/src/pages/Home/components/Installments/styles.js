import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
    margin-top: 30px;

    li {
      background: #fff;
      width: 245px;
      height: 100%;
      padding: 12px;
      border-radius: 8px;

      display: flex;
      align-items: center;

      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);

      strong {
        font-size: 2.4rem;
      }

      div {
        display: flex;
        flex-direction: column;
        font-size: 2.4rem;
        margin-left: 10px;
        padding-left: 10px;
        border-left: 1px solid rgba(0, 0, 0, 0.5);

        color: ${props =>
          props.proffit ? 'rgba(106, 255, 106, 1)' : 'rgba(255, 106, 106, 1) '};
      }
    }
  }

  @media (max-width: 1120px) {
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 40px;
      margin-top: 30px;
    }
  }

  @media (max-width: 1120px) {
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px;
      margin-top: 30px;
    }
  }

  @media (max-width: 820px) {
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 40px;
      margin-top: 30px;
    }
  }

  @media (max-width: 620px) {
    ul {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      margin-top: 20px;

      li {
        background: #fff;
        width: 300px;
      }
    }
  }
`
