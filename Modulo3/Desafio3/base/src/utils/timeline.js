import { TimelineMax as Timeline, Power1 } from 'gsap'

const getHomeTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true })
  const texts1 = node.querySelectorAll('div')

  timeline
    .from(node, 0, { display: 'none', autoAlpha: 0, delay })
    .staggerFrom(
      texts1,
      0.375,
      { autoAlpha: 0, x: -25, ease: Power1.easeOut },
      0.125,
    )

  return timeline
}

export const play = (node, appears) => {
  const delay = appears ? 0 : 0.5
  const timeline = getHomeTimeline(node, delay)

  timeline.play()
}
