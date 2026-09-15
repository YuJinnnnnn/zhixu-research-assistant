'use client';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {LanguageSwitch,useLanguage} from '@/components/language';
import './opening.css';
export default function Opening(){
 const {language,switchLanguage}=useLanguage();const en=language==='en';
 return <div className="opening" lang={en?'en':'zh-CN'}>
  <header className="opening-header"><a href="/" className="opening-brand" aria-label="Zhixu home"><span className="opening-mark">z<span>.</span></span><span>zhixu<span className="opening-brand-cn">知序</span></span></a><nav aria-label={en?'Main navigation':'主导航'}><a className="opening-guide" href="/docs">{en?'The guide':'产品说明'}<ArrowUpRight size={15}/></a><LanguageSwitch language={language} onChange={switchLanguage}/></nav></header>
  <main className="opening-main"><p className="opening-eyebrow"><span/>{en?'A LONG-TERM MEMORY FOR YOUR RESEARCH':'让研究拥有长期记忆'}</p><h1>{en?<>Good research<br/><em>remembers.</em></>:<>让每一次研究，<br/><em>都有迹可循。</em></>}</h1><p className="opening-description">{en?<>From one meeting to the next breakthrough.<br/>Keep the context. Trace the evidence. Move forward.</>:<>从一次讨论，到下一次发现。<br/>留住上下文，追溯每条依据，让研究继续向前。</>}</p><a className="opening-cta" href="/demo">{en?'Explore the demo':'进入演示'}<ArrowRight size={20}/></a><p className="opening-caption">{en?'No sign-up. Just a little curiosity.':'无需注册，带着好奇心就好。'}</p></main>
  <footer className="opening-footer"><div><span className="opening-index">01 — 03</span><p>{en?'Three meetings. Six researchers.':'三次会议，六位研究者。'}<br/><strong>{en?'One shared thread of knowledge.':'一条持续生长的研究记忆。'}</strong></p></div><p className="opening-disclosure">{en?<>An interactive product concept.<br/>Fictional IBS scenario · Simulated AI</>:<>交互式产品概念演示<br/>虚构 IBS 研究场景 · AI 功能为模拟</>}</p></footer>
 </div>
}
