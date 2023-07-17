import * as React from "react"
import { SmoothScrollbar } from '@14islands/r3f-scroll-rig'

const IndexPage = () => {
  return (
    <SmoothScrollbar>
    {(bind) => (
      <article {...bind}>
        <header>
          <h1>I'm a smooth operator</h1>
        </header>
        <section></section>
        <footer></footer>
      </article>
    )}
  </SmoothScrollbar>
  )
}

export default IndexPage

export const Head = () => <title>Project Catalyst</title>
