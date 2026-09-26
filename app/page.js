'use client'
import {useEffect,useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './page.css'

gsap.registerPlugin(ScrollTrigger)
const I='/images/'
const imgs=[
'instasave.website_688549037_18541231726068893_1072576165778608652_n.jpg',
'instasave.website_688617132_18541231666068893_5742028462167331299_n.jpg',
'instasave.website_688617382_18541231744068893_6577689113296955558_n.jpg',
'instasave.website_689211865_18541231735068893_1695991371603488873_n.jpg',
'instasave.website_691589183_18541231612068893_5151005284025632787_n.jpg',
'instasave.website_687571270_18541231693068893_5000211992553548042_n.jpg',
'instasave.website_687695228_18541231675068893_792161505405273559_n.jpg',
'instasave.website_687809224_18541231639068893_6137561667965937503_n.jpg',
'instasave.website_688369447_18541231621068893_916454212868032985_n.jpg',
'instasave.website_670903001_18541231705068893_5066209653202030543_n.jpg',
'instasave.website_671269454_18541231603068893_2344313207098816469_n.jpg',
'instasave.website_671820289_18541231684068893_7267776925263578480_n.jpg',
'instasave.website_673879368_18541231717068893_2101437404168454797_n.jpg']
function Img({n,className=''}){return <img className={className} src={I+imgs[n]} alt="RP Films wedding story"/>}
export default function Home(){
 const root=useRef(null)
 useEffect(()=>{const lenis=new Lenis({duration:1.15,smoothWheel:true}); const tick=t=>{lenis.raf(t*1000)}; gsap.ticker.add(tick); lenis.on('scroll',ScrollTrigger.update); gsap.ticker.lagSmoothing(0)
 const ctx=gsap.context(()=>{
 gsap.from('.hero-copy > *',{y:45,opacity:0,stagger:.12,duration:1.2,ease:'power3.out',delay:.2})
 gsap.from('.hero-frame',{scale:1.12,opacity:0,duration:1.6,ease:'power3.out'})
 gsap.to('.hero-frame img',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})
 gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:55,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%'}}))
 gsap.utils.toArray('.drift').forEach((el,i)=>gsap.to(el,{yPercent:i%2?8:-8,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}}))
 gsap.fromTo('.film-wrap',{width:'64vw',borderRadius:'2px'},{width:'100vw',borderRadius:'0px',ease:'none',scrollTrigger:{trigger:'.film-stage',start:'top 80%',end:'center center',scrub:true}})
 },root); ScrollTrigger.refresh(); return()=>{ctx.revert();gsap.ticker.remove(tick);lenis.destroy()}},[])
 return <main ref={root}>
 <nav><div className="brand">RP FILMS</div><div>JAMMU / KASHMIR</div><a href="#contact">ENQUIRE</a></nav>
 <section className="hero">
   <div className="hero-word hero-word-a">STORIES</div><div className="hero-word hero-word-b">THAT STAY.</div>
   <div className="hero-frame"><Img n={3}/></div>
   <div className="hero-copy"><p>WEDDINGS / PEOPLE / MEMORY</p><h1>Some moments<br/><em>refuse to leave.</em></h1><span>Scroll to enter ↓</span></div>
 </section>
 <section className="manifesto reveal"><p>We don't photograph weddings<br/>as events.</p><h2>We photograph the people<br/><em>inside them.</em></h2></section>
 <section className="editorial-grid">
   <div className="shot tall drift"><Img n={7}/><small>VANDANA / VIKAS — 01</small></div>
   <div className="shot offset drift"><Img n={9}/><small>AFTER DARK — 02</small></div>
   <div className="quote reveal"><span>THE SPACE BETWEEN POSES</span><p>is usually where<br/>the story lives.</p></div>
   <div className="shot wide drift"><Img n={5}/></div>
 </section>
 <section className="film-stage">
   <div className="film-head reveal"><span>FEATURED FILM / 2026</span><h2>Vandana <em>&</em> Vikas</h2><p>From the USA to Jammu — traditions, movement, family, and a little beautiful chaos.</p></div>
   <div className="film-wrap"><video src="/video/vandana-vikas.mp4" muted loop autoPlay playsInline preload="metadata"/></div>
 </section>
 <section className="interlude"><Img n={4} className="drift"/><div className="interlude-copy reveal"><span>NOT EVERYTHING NEEDS TO BE SHARP</span><h2>Memory<br/>moves.</h2></div></section>
 <section className="stories">
   <div className="stories-title reveal"><span>SELECTED FRAMES</span><h2>One night.<br/><em>A hundred lives.</em></h2></div>
   <div className="mosaic">
    {[0,1,2,6,8,10,11,12].map((n,i)=><figure key={n} className={'m'+i+' drift'}><Img n={n}/><figcaption>0{i+1} / RP FILMS</figcaption></figure>)}
   </div>
 </section>
 <section className="identity"><div className="identity-img"><Img n={3}/></div><div className="identity-copy reveal"><span>RP FILMS / JAMMU</span><h2>Consider us<br/>your friends,<br/><em>but with a camera.</em></h2><p>Contemporary wedding photography & films from Jammu & Kashmir.</p></div></section>
 <footer id="contact"><div className="reveal"><span>YOUR STORY DESERVES MORE THAN A GALLERY.</span><h2>Tell us<br/><em>your story.</em></h2></div><div className="links"><a href="https://www.instagram.com/rpfilmsjammu/">INSTAGRAM ↗</a><a href="mailto:rpfilmsjammu@gmail.com">EMAIL ↗</a><a href="https://wa.me/919796816816">WHATSAPP ↗</a></div><div className="foot">RP FILMS JAMMU <span>© 2026</span></div></footer>
 </main>}
