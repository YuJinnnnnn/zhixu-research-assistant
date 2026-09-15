'use client';
import {useRef} from 'react';
import {MousePointer2} from 'lucide-react';
import {LanguageSwitch,useLanguage} from '@/components/language';
import './opening.css';
export default function Opening(){
 const {language,switchLanguage}=useLanguage();const en=language==='en';
 const cursor=useRef<HTMLDivElement>(null);
 return <div className="opening" lang={en?'en':'zh-CN'} onPointerMove={e=>{if(e.pointerType!=='mouse'||!cursor.current)return;const r=e.currentTarget.getBoundingClientRect();cursor.current.style.setProperty('--cursor-x',`${(e.clientX-r.left-r.width/2)*.06}px`);cursor.current.style.setProperty('--cursor-y',`${(e.clientY-r.top-r.height/2)*.025}px`)}} onPointerLeave={()=>{cursor.current?.style.setProperty('--cursor-x','0px');cursor.current?.style.setProperty('--cursor-y','0px')}}>
  <header className="opening-header"><a href="/" className="opening-brand" aria-label="Zhixu home"><span className="opening-mark">z<span>.</span></span><span>zhixu<span className="opening-brand-cn">知序</span></span></a><nav aria-label={en?'Main navigation':'主导航'}><a className="opening-guide" href="/docs">{en?'Guide':'产品说明'}</a><LanguageSwitch language={language} onChange={switchLanguage}/></nav></header>
  <main className="opening-main"><h1>{en?'Good research remembers.':'让研究，有迹可循。'}</h1><a className="opening-cta" href="/demo">Demo</a></main>
  <div className="opening-cursor" ref={cursor} aria-hidden="true"><MousePointer2 strokeWidth={1.2}/></div>
 </div>
}
