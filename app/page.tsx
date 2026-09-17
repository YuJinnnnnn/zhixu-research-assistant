'use client';
import {useRef,type PointerEvent} from 'react';
import {MousePointer2} from 'lucide-react';
import {LanguageSwitch,useLanguage} from '@/components/language';
import {sitePath} from '@/lib/site-path';
import './opening.css';
function MagnifyingTitle({text}:{text:string}){
 const title=useRef<HTMLHeadingElement>(null);
 function reset(){title.current?.querySelectorAll<HTMLElement>('.opening-letter').forEach(letter=>{letter.style.transform=''})}
 function magnify(e:PointerEvent<HTMLHeadingElement>){
  if(e.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  e.currentTarget.querySelectorAll<HTMLElement>('.opening-letter-slot').forEach(slot=>{
   const box=slot.getBoundingClientRect(),dx=box.left+box.width/2-e.clientX,dy=box.top+box.height/2-e.clientY;
   const influence=Math.max(0,1-Math.hypot(dx,dy)/125),weight=influence*influence;
   const letter=slot.firstElementChild as HTMLElement;
   letter.style.transform=`translate(${dx*weight*.18}px,${-12*weight}px) scale(${1+weight*.55})`;
  });
 }
 return <h1 ref={title} aria-label={text} onPointerMove={magnify} onPointerLeave={reset}>{Array.from(text).map((letter,i)=><span className="opening-letter-slot" aria-hidden="true" key={`${text}-${i}`}><span className="opening-letter">{letter===' '?'\u00a0':letter}</span></span>)}</h1>
}
export default function Opening(){
 const {language,switchLanguage}=useLanguage();const en=language==='en';
 const cursor=useRef<HTMLDivElement>(null);
 return <div className="opening" lang={en?'en':'zh-CN'} onPointerMove={e=>{if(e.pointerType!=='mouse'||!cursor.current)return;e.currentTarget.dataset.cursorActive='true';const r=e.currentTarget.getBoundingClientRect();cursor.current.style.setProperty('--cursor-x',`${e.clientX-r.left-12}px`);cursor.current.style.setProperty('--cursor-y',`${e.clientY-r.top-12}px`)}} onPointerLeave={e=>{delete e.currentTarget.dataset.cursorActive;cursor.current?.style.removeProperty('--cursor-x');cursor.current?.style.removeProperty('--cursor-y')}}>
  <header className="opening-header"><a href={sitePath('/')} className="opening-brand" aria-label="Zhixu home"><span className="opening-mark">z<span>.</span></span></a><nav aria-label={en?'Main navigation':'主导航'}><a className="opening-guide" href={sitePath('/docs')}>{en?'Guide':'产品说明'}</a><LanguageSwitch language={language} onChange={switchLanguage}/></nav></header>
  <main className="opening-main"><MagnifyingTitle text={en?'Good research remembers.':'让研究，有迹可循。'}/><a className="opening-cta" href={sitePath('/demo')}>DEMO</a></main>
  <div className="opening-cursor" ref={cursor} aria-hidden="true"><MousePointer2 strokeWidth={1.2}/></div>
 </div>
}


