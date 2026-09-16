import {meetings,people} from './scenario.ts';
import {saveAndExtract} from './workflow.ts';
import type {State} from './memory.ts';
export type TranscriptVersion={version:number;text:string;author:string;at:string|null};
export type MeetingSummary={generatedAt:string;author:string;signature:string;lines:{speaker:string;text:string}[]};
export function transcript(s:State,m:number,p:number):string{return m===2&&p===3?s.sourceText:s.transcriptVersions?.[`${m}:${p}`]?.at(-1)?.text??meetings[m].speeches[p]}
export function versions(s:State,m:number,p:number):TranscriptVersion[]{return s.transcriptVersions?.[`${m}:${p}`]??[{version:1,text:transcript(s,m,p),author:people[p].name,at:null}]}
export function signature(s:State,m:number){return JSON.stringify(meetings[m].speeches.map((_,p)=>[transcript(s,m,p),versions(s,m,p).length]))}
export function saveTranscript(s:State,m:number,p:number,text:string,actor:string,at=new Date().toISOString()):State{
 const value=text.trim();if(!value)throw Error('Transcript cannot be empty.');if(value===transcript(s,m,p))return s;
 if(m===2&&p===3)return saveAndExtract(s,value,actor).state;
 const key=`${m}:${p}`,history=versions(s,m,p);return {...s,revision:s.revision+1,transcriptVersions:{...s.transcriptVersions,[key]:[...history,{version:history.length+1,text:value,author:actor,at}]},memories:s.memories.map(mem=>mem.meeting===m&&mem.speaker===p&&mem.status!=='forgotten'?{...mem,status:'pending',sourceReviewRequired:true,version:mem.version+1}:mem),audit:[`${actor} · ${at} · transcript ${m+1}/${people[p].name} v${history.length+1}`,...s.audit]};
}
export function generateSummary(s:State,m:number,actor:string,at=new Date().toISOString()):State{
 const lines=meetings[m].speeches.map((_,p)=>({speaker:people[p].name,text:transcript(s,m,p).split(/(?<=[。！？]|[.!?](?=\s|$))\s*/u).slice(0,2).join(' ')}));
 return {...s,meetingSummaries:{...s.meetingSummaries,[m]:{generatedAt:at,author:actor,signature:signature(s,m),lines}}};
}

