'use client';
import {useEffect,useState} from 'react';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator} from '@/components/ui/dropdown-menu';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {ChevronDown,Plus} from 'lucide-react';
export type Project={id:string;name:string;created:string};
export const PROJECT_KEY='zhixu-projects-v1';
export function readProjects():Project[]{const list=JSON.parse(localStorage.getItem(PROJECT_KEY)||'[]');if(!Array.isArray(list)||list.some(p=>typeof p.id!=='string'||typeof p.name!=='string'||typeof p.created!=='string'))throw Error('Invalid project storage');return list}
export function ProjectPicker({name,en}:{name:string;en:boolean}){
 const [projects,setProjects]=useState<Project[]>([]),[open,setOpen]=useState(false),[title,setTitle]=useState(''),[error,setError]=useState('');
 const refresh=()=>{try{setProjects(readProjects());setError('')}catch{setError(en?'Project storage could not be read.':'无法读取项目存档。')}};
 useEffect(()=>{refresh();if(new URLSearchParams(window.location.search).has('create'))setOpen(true)},[]);
 function create(){try{const list=readProjects(),value=title.trim();if(!value)return;if(list.some(p=>p.name.toLowerCase()===value.toLowerCase())){setError(en?'This project name already exists.':'已存在同名项目。');return}const project={id:crypto.randomUUID(),name:value,created:new Date().toISOString()};localStorage.setItem(PROJECT_KEY,JSON.stringify([...list,project]));window.location.assign('/demo/project?id='+encodeURIComponent(project.id))}catch{setError(en?'Could not save the project.':'无法保存项目。')}}
 return <><DropdownMenu onOpenChange={v=>{if(v)refresh()}}><DropdownMenuTrigger className="project-switch">{name}<ChevronDown size={15}/></DropdownMenuTrigger><DropdownMenuContent className="workspace-project-menu"><DropdownMenuItem render={<a href="/demo/ibs"/>}>IBS · 2D Materials</DropdownMenuItem>{projects.map(p=><DropdownMenuItem key={p.id} render={<a href={'/demo/project?id='+encodeURIComponent(p.id)}/>}>{p.name}</DropdownMenuItem>)}<DropdownMenuSeparator/><DropdownMenuItem onClick={()=>{setTitle('');setOpen(true)}}><Plus size={15}/>{en?'Create new project':'创建新项目'}</DropdownMenuItem>{error&&<p role="alert">{error}</p>}</DropdownMenuContent></DropdownMenu><Dialog open={open} onOpenChange={setOpen}><DialogContent className="project-dialog"><DialogHeader><DialogTitle>{en?'Create new project':'创建新项目'}</DialogTitle><DialogDescription>{en?'Saved in this browser.':'保存在当前浏览器中。'}</DialogDescription></DialogHeader><form onSubmit={e=>{e.preventDefault();create()}}><label htmlFor="new-project-name">{en?'Project name':'项目名称'}</label><Input id="new-project-name" value={title} onChange={e=>setTitle(e.target.value)} maxLength={80} autoFocus required/><Button type="submit" disabled={!title.trim()}>{en?'Create':'创建'}</Button></form>{error&&<p role="alert">{error}</p>}</DialogContent></Dialog></>
}
