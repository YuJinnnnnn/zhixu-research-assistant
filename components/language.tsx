'use client';
import {Children,cloneElement,isValidElement,useEffect,useState,type ReactNode,type ReactElement} from 'react';
import {LANGUAGE_KEY,translate,type Locale} from '@/lib/i18n';
export function useLanguage(){
 const [language,setLanguage]=useState<Locale>('en');
 useEffect(()=>{try{if(localStorage.getItem(LANGUAGE_KEY)==='zh')setLanguage('zh')}catch{}const sync=(e:StorageEvent)=>{if(e.key===LANGUAGE_KEY)setLanguage(e.newValue==='zh'?'zh':'en')};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[]);
 useEffect(()=>{document.documentElement.lang=language==='en'?'en':'zh-CN';document.title=language==='en'?'Zhixu · Research memory assistant':'知序 · IBS 研究团队工作台'},[language]);
 function switchLanguage(next:Locale){setLanguage(next);try{localStorage.setItem(LANGUAGE_KEY,next)}catch{}}
 return {language,switchLanguage,t:(text:string)=>translate(text,language),localize:(node:ReactNode)=>localizeTree(node,language)};
}
// Localize rendered copy without mutating business state or input values. Unlike DOM
// replacement, this runs within React and remains safe across rerenders and portals.
export function localizeTree(node:ReactNode,locale:Locale):ReactNode{
 return Children.map(node,child=>{
  if(typeof child==='string')return translate(child,locale);
  if(!isValidElement(child))return child;
  const element=child as ReactElement<Record<string,unknown>>;const props=element.props;
  if(props['data-no-localize'])return element;
  const patch:Record<string,unknown>={};
  for(const key of ['placeholder','aria-label','title'])if(typeof props[key]==='string')patch[key]=translate(props[key] as string,locale);
  if(props.children!==undefined)patch.children=localizeTree(props.children as ReactNode,locale);
  // Option values must not change when their labels are translated.
  if(props.value===undefined&&typeof props.children==='string'&&(element.type==='option'||(typeof element.type==='function'&&element.type.name==='NativeSelectOption')))patch.value=props.children;
  return cloneElement(element,patch);
 });
}
export function LanguageSwitch({language,onChange}:{language:Locale;onChange:(v:Locale)=>void}){return <div className="language-switch" role="group" aria-label="Language / 语言" data-no-localize><button type="button" lang="zh-CN" aria-pressed={language==='zh'} onClick={()=>onChange('zh')}>中文</button><button type="button" lang="en" aria-pressed={language==='en'} onClick={()=>onChange('en')}>EN</button></div>}
