'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './page.css'

gsap.registerPlugin(ScrollTrigger)

const images = [
  'instasave.website_688549037_18541231726068893_1072576165778608652_n.jpg',
  'instasave.website_688617132_18541231666068893_5742028462167331299_n.jpg',
  'instasave.website_688617382_18541231744068893_6577689113296955558_n.jpg',
  'instasave.website_687571270_18541231693068893_5000211992553548042_n.jpg',
  'instasave.website_687809224_18541231639068893_6137561667965937503_n.jpg',
  'instasave.website_670903001_18541231705068893_5066209653202030543_n.jpg',
  'instasave.website_671269454_18541231603068893_2344313207098816469_n.jpg',
]

function Photo({ n, alt, eager = false }) {
  return <img src={'/images/' + images[n]} alt={alt} loading={eager ? 'eager' : 'lazy'} />
}

export default function Home() {
  const root = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    lenis.on('scroll', ScrollTrigger.update)
    const ctx = gsap.context(() => {
      gsap.from('.hero-title > *', { y: 50, opacity: 0, duration: 1.05, stagger: 0.12, ease: 'power3.out', delay: 0.15 })
      gsap.from('.hero-photo', { scale: 1.06, opacity: 0, duration: 1.45, ease: 'power2.out' })
      gsap.to('.hero-photo img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.utils.toArray('.rise').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
      gsap.to('.film-visual', { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.film', start: 'top 85%', end: 'top 35%', scrub: true } })
    }, root)
    ScrollTrigger.refresh()
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  return <main ref={root}>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="RP Films, back to top">RP<span>·</span>FILMS</a>
      <span className="location">JAMMU & KASHMIR</span>
      <a className="header-link" href="#contact">LET'S TALK <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-photo"><Photo n={0} alt="Couple photographed against a deep red curtain" eager /></div>
      <div className="hero-shade" />
      <div className="hero-title">
        <p className="eyebrow">WEDDING PHOTOGRAPHY & FILMS <span> / </span> ROHIT PANDIT</p>
        <h1 id="hero-heading">The feeling<br /><em>stays.</em></h1>
        <div className="hero-bottom"><span>For everything that happened<br />between the photographs.</span><a href="#introduction">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
      </div>
      <span className="hero-index" aria-hidden="true">RP / 01</span>
    </section>

    <section className="introduction" id="introduction">
      <div className="intro-top rise"><span className="eyebrow">THE WAY WE SEE IT</span><span className="intro-mark" aria-hidden="true">✳</span></div>
      <p className="intro-statement rise">A wedding is never just one story.<br /><em>It's all the little ones happening at once.</em></p>
      <div className="intro-bottom rise"><span>RP FILMS — JAMMU</span><p>We make photographs and films that bring you back to the people, the movement, and the feeling of being there.</p></div>
    </section>

    <section className="stills" id="stills" aria-labelledby="stills-heading">
      <div className="stills-heading rise"><span className="eyebrow">01 / IN STILLS</span><h2 id="stills-heading">Held for<br /><em>a moment.</em></h2></div>
      <div className="stills-composition">
        <div className="stills-main"><Photo n={2} alt="Couple dancing beneath the wedding venue arch" /></div>
        <div className="stills-side"><Photo n={1} alt="Bride captured through motion and reflections" /></div>
        <p className="stills-note rise">The blur.<br />The glance.<br />The in-between.</p>
      </div>
    </section>

    <section className="film" id="film" aria-labelledby="film-heading">
      <div className="film-heading rise"><span className="eyebrow">02 / IN MOTION</span><h2 id="film-heading">And then<br /><em>it moves.</em></h2><p>Vandana & Vikas<br />A wedding film in Jammu.</p></div>
      <div className="film-visual"><video src="/video/vandana-vikas-web.mp4" poster="/video/vandana-vikas-poster.jpg" muted loop autoPlay playsInline preload="metadata" aria-label="Short preview of Vandana and Vikas's wedding film" /></div>
      <div className="film-caption"><span>VANDANA × VIKAS</span><span>JAMMU, INDIA</span></div>
    </section>

    <section className="frames" aria-labelledby="frames-heading">
      <div className="frames-heading rise"><span className="eyebrow">A FEW FRAMES MORE</span><h2 id="frames-heading">Stay a little<br /><em>longer.</em></h2></div>
      <div className="frames-gallery">
        <figure className="frame-one"><Photo n={3} alt="Couple photographed against red drapery" /><figcaption>01 / THE QUIET</figcaption></figure>
        <figure className="frame-two"><Photo n={6} alt="Bride in a dark garden before the celebration" /><figcaption>02 / THE WAIT</figcaption></figure>
        <figure className="frame-three"><Photo n={4} alt="Couple walking together through a warmly lit wedding venue" /><figcaption>03 / THE NIGHT</figcaption></figure>
      </div>
    </section>

    <footer id="contact">
      <div className="footer-photo"><Photo n={5} alt="Bride and groom in front of a red curtain" /></div>
      <div className="footer-content rise"><span className="eyebrow">YOUR STORY, NEXT</span><h2>Let's make<br /><em>it last.</em></h2><a className="contact-button" href="https://wa.me/919796816816" target="_blank" rel="noopener noreferrer">TELL US ABOUT YOUR DAY <span aria-hidden="true">↗</span></a></div>
      <div className="footer-bottom"><span>RP FILMS / JAMMU & KASHMIR</span><a href="https://www.instagram.com/rpfilmsjammu/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a></div>
    </footer>
  </main>
}
