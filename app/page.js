'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './page.css'

gsap.registerPlugin(ScrollTrigger)

const photos = {
  hero: 'instasave.website_688549037_18541231726068893_1072576165778608652_n.jpg',
  dance: 'instasave.website_688617382_18541231744068893_6577689113296955558_n.jpg',
  reflection: 'instasave.website_688617132_18541231666068893_5742028462167331299_n.jpg',
  night: 'instasave.website_671269454_18541231603068893_2344313207098816469_n.jpg',
  ending: 'instasave.website_670903001_18541231705068893_5066209653202030543_n.jpg',
}

function Photo({ name, alt, sizes, priority = false }) {
  return <Image src={'/images/' + photos[name]} alt={alt} fill sizes={sizes} priority={priority} quality={86} />
}

export default function Home() {
  const root = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 900px)')
    let lenis
    let tick
    if (!reduce && desktop.matches) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
      tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from('.hero-content > *', { y: 35, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out', delay: 0.1 })
        gsap.to('.hero-media img', { scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      }
      if (!reduce) {
        mm.add('(min-width: 900px)', () => {
          const track = root.current.querySelector('.rail-track')
          const distance = () => track.scrollWidth - window.innerWidth
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: '.rail',
              start: 'top top',
              end: () => '+=' + Math.round(distance() * 1.18),
              pin: true,
              scrub: 0.85,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })
          return () => tween.scrollTrigger?.kill()
        })
      }
    }, root)

    ScrollTrigger.refresh()
    return () => {
      mm.revert()
      ctx.revert()
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
    }
  }, [])

  return <main ref={root}>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="RP Films, back to top">RP<span>·</span>FILMS</a>
      <span>JAMMU & KASHMIR</span>
      <a href="#contact">ENQUIRE <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media"><Photo name="hero" alt="Couple against deep red wedding drapery" sizes="(max-width: 899px) 100vw, 62vw" priority /></div>
      <div className="hero-content">
        <p className="small-label">ROHIT PANDIT FILMS <span>—</span> WEDDINGS IN JAMMU & BEYOND</p>
        <h1 id="hero-title">A wedding,<br /><em>as it felt.</em></h1>
        <div className="hero-foot"><span>PHOTOGRAPHY & FILMS<br />FOR THE MOMENTS THAT STAY</span><a href="#stories">EXPLORE THE STORIES <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="hero-side" aria-hidden="true">RP / AN ARCHIVE OF FEELING</div>
    </section>

    <section className="rail" id="stories" aria-label="Selected RP Films stories">
      <div className="rail-track">
        <article className="chapter chapter-portraits" aria-labelledby="portrait-title">
          <div className="chapter-copy">
            <div className="chapter-top"><span>01 / PORTRAITS</span><span>JAMMU, INDIA</span></div>
            <div className="chapter-center"><p className="chapter-kicker">A PORTRAIT STUDY</p><h2 id="portrait-title">The space<br /><em>between</em><br />poses.</h2><p>Light, movement, a glance across the room. The moments that rarely happen twice.</p></div>
            <div className="chapter-bottom"><span>RP FILMS / SELECTED FRAMES</span><span>01 — 02</span></div>
          </div>
          <div className="chapter-image">
            <Photo name="dance" alt="Couple dancing under a wedding venue arch" sizes="(max-width: 899px) 100vw, 59vw" />
            <div className="inset-photo"><Photo name="reflection" alt="Bride seen through light and reflections" sizes="(max-width: 899px) 32vw, 14vw" /></div>
            <span className="image-caption">THE ROOM IN MOTION</span>
          </div>
        </article>

        <article className="chapter chapter-film" aria-labelledby="film-title">
          <div className="chapter-copy">
            <div className="chapter-top"><span>02 / FILM</span><span>JAMMU, INDIA</span></div>
            <div className="chapter-center"><p className="chapter-kicker">A STORY BROUGHT HOME</p><h2 id="film-title">Vandana<br /><em>& Vikas.</em></h2><p>From the USA to Jammu. Family, tradition, and a day full of movement.</p></div>
            <div className="chapter-bottom"><span>26 SECOND FILM EXCERPT</span><span>02 — 02</span></div>
          </div>
          <div className="chapter-video">
            <video src="/video/vandana-vikas-web.mp4" poster="/video/vandana-vikas-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Short wedding film excerpt featuring Vandana and Vikas" />
            <span className="video-caption">VANDANA × VIKAS / RP FILMS</span>
          </div>
        </article>
      </div>
    </section>

    <section className="closing" id="contact">
      <div className="closing-photo"><Photo name="ending" alt="Wedding portrait beside red drapery" sizes="(max-width: 899px) 100vw, 55vw" /></div>
      <div className="closing-content"><span className="small-label">RP FILMS / JAMMU</span><h2>Consider us<br />your friends,<br /><em>but with a camera.</em></h2><a className="contact-link" href="https://wa.me/919796816816" target="_blank" rel="noopener noreferrer">TELL US YOUR STORY <span aria-hidden="true">↗</span></a></div>
      <div className="closing-foot"><span>WEDDINGS / PEOPLE / MEMORY</span><a href="https://www.instagram.com/rpfilmsjammu/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a></div>
    </section>
  </main>
}
