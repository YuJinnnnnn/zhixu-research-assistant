'use client';
import {ProjectShell} from '@/components/project-shell';
import {useEffect,useState} from 'react';
import {LanguageSwitch,useLanguage} from '@/components/language';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuRadioGroup,DropdownMenuRadioItem} from '@/components/ui/dropdown-menu';
import {ChevronDown} from 'lucide-react';
import {people} from '@/lib/scenario';
type Project={id:string;name:string;created:string};
const KEY='zhixu-projects-v1';
export default function Projects(){
 const {language,switchLanguage}=useLanguage(),en=language==='en';
 const [projectView,setProjectView]=useState('overview');
 const [actor,setActor]=useState('Han'),[dialog,setDialog]=useState<'create'|'open'|null>(null),[name,setName]=useState(''),[projects,setProjects]=useState<Project[]>([]),[active,setActive]=useState<Project|null>(null),[error,setError]=useState(''),[ready,setReady]=useState(false);
 function read(){try{const raw=localStorage.getItem(KEY);const list=raw?JSON.parse(raw):[];if(!Array.isArray(list)||list.some(p=>typeof p.id!=='string'||typeof p.name!=='string'||typeof p.created!=='string'))throw Error();setProjects(list);setReady(true)}catch{setError(en?'Project storage could not be read. Please reload.':'无法读取项目存档，请刷新重试。')}}
 useEffect(()=>{read();if(new URLSearchParams(window.location.search).has('create'))setDialog('create')},[]);
 function create(){const title=name.trim();if(!title)return;try{const current=JSON.parse(localStorage.getItem(KEY)||'[]') as Project[];if(current.some(p=>p.name.toLowerCase()===title.toLowerCase())){setError(en?'A project with this name already exists.':'已存在同名项目。');return}const project={id:crypto.randomUUID(),name:title,created:new Date().toISOString()};const next=[...current,project];localStorage.setItem(KEY,JSON.stringify(next));setProjects(next);setActive(project);setDialog(null);setName('')}catch{setError(en?'Could not save the project. Please check browser storage.':'无法保存项目，请检查浏览器存储。')}}
 if(active)return <ProjectShell language={language} onLanguage={switchLanguage} actor={actor} onActor={setActor} project={active.name} view={projectView} onView={setProjectView}><main className="project-empty"><h1>{active.name}</h1><div className="project-empty-message"><h2>{projectView==='overview'?(en?'Your project is ready.':'项目已创建。'):projectView==='meetings'?(en?'No meetings yet.':'暂无会议记录。'):projectView==='memory'?(en?'No memories yet.':'暂无项目记忆。'):(en?'No conversations yet.':'暂无对话记录。')}</h2><p>{en?'This is a new, empty project. Explore the complete workflow in the IBS sample.':'这是新建的空白项目，可在 IBS 示例中体验完整工作流程。'}</p><a href="/demo/ibs">{en?'Open IBS sample':'打开 IBS 示例'}</a></div></main></ProjectShell>; return <div className="simple-app"><header className="simple-header demo-header"><a href="/" className="demo-brand" aria-label="Zhixu home"><span>z.</span></a><div className="header-actions demo-header-actions"><a href="/docs" className="demo-guide">Guide</a><LanguageSwitch language={language} onChange={switchLanguage}/><DropdownMenu><DropdownMenuTrigger className="demo-user-trigger" aria-label={en?'Switch user':'切换用户'}><span>{actor}</span><ChevronDown size={15}/></DropdownMenuTrigger><DropdownMenuContent className="demo-user-menu" align="end" sideOffset={8}><DropdownMenuRadioGroup value={actor} onValueChange={value=>setActor(String(value))}>{people.map(p=><DropdownMenuRadioItem className="demo-user-item" key={p.name} value={p.name}>{p.name}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu></div></header>
 <main className="project-launcher"><Button className="project-entry" variant="outline" disabled={!ready} onClick={()=>{setError('');setDialog('create')}}>{en?'Create new project':'创建新项目'}</Button><Button className="project-entry" variant="outline" disabled={!ready} onClick={()=>{read();setError('');setDialog('open')}}>{en?'Open existing project':'打开已有项目'}</Button>{error&&<p role="alert">{error}</p>}</main>
 <Dialog open={dialog!==null} onOpenChange={open=>{if(!open)setDialog(null)}}><DialogContent className="project-dialog"><DialogHeader><DialogTitle>{dialog==='create'?(en?'Create new project':'创建新项目'):(en?'Open existing project':'打开已有项目')}</DialogTitle><DialogDescription>{en?'Projects are saved in this browser.':'项目保存在当前浏览器中。'}</DialogDescription></DialogHeader>{dialog==='create'?<form onSubmit={e=>{e.preventDefault();create()}}><label htmlFor="project-name">{en?'Project name':'项目名称'}</label><Input id="project-name" value={name} onChange={e=>setName(e.target.value)} maxLength={80} required autoFocus autoComplete="off"/><Button type="submit" disabled={!name.trim()}>{en?'Create':'创建'}</Button></form>:<div className="project-list"><a href="/demo/ibs"><strong>{en?'IBS · 2D Materials':'IBS · 二维材料研究'}</strong><small>{en?'Sample project · 3 meetings':'示例项目 · 3 次会议'}</small></a>{projects.map(p=><button key={p.id} onClick={()=>{setActive(p);setDialog(null)}}><strong>{p.name}</strong><small>{new Date(p.created).toLocaleDateString(en?'en-US':'zh-CN')}</small></button>)}</div>}{error&&<p role="alert">{error}</p>}</DialogContent></Dialog>
 </div>
}



