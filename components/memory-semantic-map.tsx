'use client';
import {useState} from 'react';
import {people} from '@/lib/scenario';
import {translate,type Locale} from '@/lib/i18n';

const views=[{id:'all',date:'',en:'All meetings',zh:'全部会议'},{id:'0',date:'09.02',en:'Planning',zh:'项目部署'},{id:'1',date:'09.12',en:'First round',zh:'项目展开'},{id:'2',date:'09.23',en:'Progress',zh:'项目进度'}] as const;
const shares:Record<string,number[]>={all:[19,16,15,20,14,16],'0':[22,17,18,13,14,16],'1':[15,18,20,19,16,12],'2':[21,13,17,22,15,12]};
const words:Record<string,number[]>={all:[518,441,402,546,379,425],'0':[176,139,151,103,112,128],'1':[121,149,167,160,132,98],'2':[221,153,184,283,135,199]};
const evidence:Record<string,string[][]>={
 all:[['690 Ω·μm','Choi','Reviewed B-group median','复核后的 B 组中位数'],['15.9%','Wang','Revised reduction','修订后的降幅'],['≥75%','Park','Screening threshold','初筛通过率门槛'],['8 / 12','Lee','B-group screening','B 组初筛结果']],
 '0':[['−20%','Park','Monthly research target','本月研究目标'],['12 + 12','Lee','Planned devices','计划器件数量'],['M09','Kim','Shared material batch','同批材料']],
 '1':[['610 Ω·μm','Choi','Preliminary B median','B 组初步中位数'],['10 / 12','Lee','A-group screening','A 组初筛结果'],['8 / 12','Lee','B-group screening','B 组初筛结果']],
 '2':[['690 Ω·μm','Choi','Corrected B median','修订后的 B 组中位数'],['15.9%','Wang','Revised reduction','修订后的降幅'],['≥75%','Park','New screening threshold','新的初筛门槛']],
};
const petals=[
 {name:'Park',color:'#9cb8f0',path:'M285 223 C191 205 121 143 146 78 C171 16 269 23 309 92 C337 140 334 202 285 223 Z',x:218,y:105},
 {name:'Kim',color:'#a9d8cb',path:'M297 218 C261 142 282 65 345 52 C403 41 431 112 402 171 C379 218 337 244 297 218 Z',x:350,y:111},
 {name:'Lee',color:'#c9b5e8',path:'M305 227 C353 152 428 104 477 142 C526 181 492 256 426 274 C376 287 328 269 305 227 Z',x:438,y:205},
 {name:'Choi',color:'#e5b8c8',path:'M302 234 C390 225 474 259 467 324 C459 390 363 397 317 343 C287 307 277 261 302 234 Z',x:393,y:327},
 {name:'Wang',color:'#b7d8e8',path:'M291 236 C340 304 338 392 275 410 C214 427 180 349 207 289 C228 243 261 220 291 236 Z',x:270,y:344},
 {name:'Han',color:'#c9dfbf',path:'M280 229 C213 282 122 300 94 243 C65 183 143 141 210 165 C255 181 295 202 280 229 Z',x:157,y:229},
];
const semanticLayouts:Record<string,{scale:number,dx:number,dy:number}[]>={
 all:[{scale:1,dx:0,dy:0},{scale:1,dx:0,dy:0},{scale:1,dx:0,dy:0},{scale:1,dx:0,dy:0},{scale:1,dx:0,dy:0},{scale:1,dx:0,dy:0}],
 '0':[{scale:1.13,dx:-8,dy:-9},{scale:1.06,dx:-2,dy:-5},{scale:1.02,dx:8,dy:2},{scale:.72,dx:24,dy:22},{scale:.78,dx:-12,dy:24},{scale:.84,dx:-24,dy:7}],
 '1':[{scale:.78,dx:-22,dy:-15},{scale:.96,dx:10,dy:-10},{scale:1.2,dx:-8,dy:-2},{scale:1.18,dx:-6,dy:-10},{scale:.9,dx:-5,dy:12},{scale:.7,dx:-25,dy:13}],
 '2':[{scale:1.1,dx:-2,dy:7},{scale:.72,dx:18,dy:-20},{scale:.82,dx:21,dy:-7},{scale:1.22,dx:-15,dy:-9},{scale:1.16,dx:8,dy:-15},{scale:.68,dx:-23,dy:18}],
};
const semanticCenter={x:292,y:231};

export function MemorySemanticMap({language}:{language:Locale}){
 const en=language==='en',t=(s:string)=>translate(s,language),[view,setView]=useState('all'),[focus,setFocus]=useState<string|null>(null),layout=semanticLayouts[view];
 return <div className="semantic-memory">
  <div className="semantic-page-heading"><h1>{en?'IBS · 2D Materials':'IBS · 二维材料研究'}</h1></div>
  <div className="semantic-view-switch" role="group" aria-label={en?'Meeting range':'会议范围'}>{views.map(v=><button key={v.id} aria-pressed={view===v.id} onClick={()=>{setView(v.id);setFocus(null)}}>{v.date&&<small>{v.date}</small>}{en?v.en:v.zh}</button>)}</div>
  <div className="semantic-workspace"><section className="semantic-map-card"><div className="semantic-card-title"><div><h2>{en?'Semantic overlap':'语义重叠'}</h2><p>{en?'Larger shared areas indicate stronger topic overlap. Select a speaker to isolate their contribution.':'重叠面积越大，代表共同讨论的主题越多。选择成员可查看其贡献。'}</p></div></div>
   <svg className="semantic-flower" viewBox="55 18 465 420" role="img" aria-label={en?'Overlapping semantic regions for six speakers':'六位成员的语义重叠区域'}><g className="semantic-core"><circle cx="292" cy="231" r="58"/><text x="292" y="224">{en?'Research':'研究'}</text><text x="292" y="245">{en?'discussion':'讨论'}</text></g>{petals.map((p,i)=>{const l=layout[i],x=semanticCenter.x+(p.x-semanticCenter.x)*l.scale+l.dx,y=semanticCenter.y+(p.y-semanticCenter.y)*l.scale+l.dy,tx=semanticCenter.x*(1-l.scale)+l.dx,ty=semanticCenter.y*(1-l.scale)+l.dy;return <g key={p.name} role="button" tabIndex={0} aria-label={`${p.name}, ${shares[view][i]}%`} className={focus&&focus!==p.name?'muted':focus===p.name?'selected':''} onClick={()=>setFocus(focus===p.name?null:p.name)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setFocus(focus===p.name?null:p.name)}}}><path d={p.path} fill={p.color} transform={`translate(${tx} ${ty}) scale(${l.scale})`}/><circle cx={x} cy={y} r="22"/><text className="speaker-initial" x={x} y={y+5}>{p.name[0]}</text><text className="speaker-label" x={x} y={y+39}>{p.name}</text></g>})}</svg>
  </section>
   <aside className="semantic-evidence"><h2>{en?'Contributors':'参与成员'}</h2><div className="semantic-contributors">{people.map((p,i)=>{const items=evidence[view].filter(e=>e[1]===p.name);return <button key={p.name} className={focus===p.name?'active':''} onClick={()=>setFocus(focus===p.name?null:p.name)}><span><strong>{p.name}</strong><small>{t(p.role)}</small></span><em>{words[view][i]} {en?'characters':'字符'} · {shares[view][i]}%</em><i><span style={{width:`${shares[view][i]*3.6}%`}}/></i>{items.length>0&&<div className="contributor-evidence">{items.map((e,j)=><div key={j}><strong>{e[0]}</strong><span>{en?e[2]:e[3]}</span><small>{view==='all'?'09.23':views.find(v=>v.id===view)?.date}</small></div>)}</div>}</button>})}</div></aside>
  </div>
 </div>
}
