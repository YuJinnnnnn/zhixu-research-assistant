import {act,checkExtraction,editSource,extract,type State,type MemoryId} from './memory.ts';

// The owner reviews source and extracted value together in one explicit action.
export function confirmInPlace(s:State,id:MemoryId,actor:string):State{
 const record=s.memories.find(m=>m.id===id);
 if(!record||record.owner!==actor)throw new Error(`请由 ${record?.owner??'负责人'} 核查确认`);
 if(id==='data')return act(checkExtraction(s,actor),id,'confirm',actor);
 return act(s,id,'confirm',actor);
}

// Saving never confirms data. An unparseable correction still invalidates old data.
export function saveAndExtract(s:State,text:string,actor:string):{state:State;message:string}{
 const changed=editSource(s,text,actor);
 try{return {state:extract(changed,actor),message:'修改已保存，已自动提取新数值；等待 Choi 核查确认。'}}
 catch(e){return {state:changed,message:`修改已保存，旧数据已暂停调用。${(e as Error).message}`}}
}

