import {people,meetings} from './scenario.ts';
import {peopleEn,meetingsEn} from './scenario.en.ts';
import {uiEnglish} from './ui.en.ts';
export type Locale='zh'|'en';
export const LANGUAGE_KEY='zhixu-language';
const dictionary:Record<string,string>={...uiEnglish};
function pair(a:unknown,b:unknown){if(typeof a==='string'&&typeof b==='string'&&a!==b)dictionary[a]=b;else if(Array.isArray(a)&&Array.isArray(b))a.forEach((v,i)=>pair(v,b[i]));else if(a&&b&&typeof a==='object'&&typeof b==='object')for(const k of Object.keys(a))pair((a as Record<string,unknown>)[k],(b as Record<string,unknown>)[k]);}
pair(people,peopleEn);pair(meetings,meetingsEn);
const keys=Object.keys(dictionary).sort((a,b)=>b.length-a.length);
const pattern=new RegExp(keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
// Presentation-only localization: stored evidence, identifiers and role values remain unchanged.
export function translate(text:string,locale:Locale):string{
 if(locale==='zh')return text;
 const exact=dictionary[text.trim()];if(exact)return text.replace(text.trim(),exact);
 const source=englishSource(text);if(source!==text)return source;
 return text.replace(pattern,m=>dictionary[m]).replace(/。/g,'. ').replace(/（/g,' (').replace(/）/g,')').replace(/：/g,': ');
}
const cnSource=/^我要纠正上次报告的 B 组中位数：610 来自旧版汇总表，复核后应为 (\d+(?:\.\d+)?) Ω·μm，有效样本仍是 5 个。A 组仍为 820，有效样本 6 个，以复核表 v2 为准。$/;
export function englishSource(text:string):string{const m=text.match(cnSource);return m?`I need to correct the B-group median from the previous report: 610 came from an older summary sheet. The reviewed value is ${m[1]} Ω·μm, with 5 valid samples. A remains 820, with 6 valid samples. Use review sheet v2.`:text;}
