import React from 'react'

import logo from '../../../../assets/logo.png'

import { Container, Content, Profile } from './styles'

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <a href="https://www.igti.com.br/">
            <img src={logo} alt="GoBarber" />
          </a>
          <h2>React Taxes Calculator</h2>
        </nav>
        <aside>
          <div>
            <h3>Harrison Henri</h3>
            <h3>Bootcamp IGTI Full-Stack</h3>
          </div>
          <Profile>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
