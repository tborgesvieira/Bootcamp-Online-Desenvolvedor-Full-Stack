import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  padding: 0 3rem;

  -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
`

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a {
      img {
        width: 60px;
        height: 40px;
        margin-right: 20px;
        padding-right: 20px;
        border-right: 1px solid #eee;
      }
    }

    h2 {
      font-size: 2.4rem;
    }
  }

  aside {
    display: flex;
    align-items: center;

    h3 {
      font-size: 1.6rem;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`
