import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'

import Home from './pages/Home'

import { play } from './utils/timeline'

import GlobalStyle from './styles/global'

function App() {
  return (
    <div>
      <TransitionGroup component={null}>
        <Transition
          appear
          onEnter={(node, appears) => play(node, appears)}
          timeout={{ enter: 750, exit: 0 }}
        >
          <Home />
        </Transition>
        <GlobalStyle />
      </TransitionGroup>
    </div>
  )
}

export default App
