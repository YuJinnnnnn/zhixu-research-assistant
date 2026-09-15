import test from 'node:test';
import assert from 'node:assert/strict';
import {translate,englishSource} from './i18n.ts';
import {initialState,recall,restore} from './memory.ts';
import {confirmInPlace,saveAndExtract} from './workflow.ts';
import {meetings,people} from './scenario.ts';
test('English scenario, reports and memory labels retain data without changing stored state',()=>{
 let s=confirmInPlace(initialState(),'data','Choi');s=confirmInPlace(s,'decision','Park');const raw=JSON.stringify(s);
 for(const meeting of meetings)for(const value of [meeting.title,meeting.purpose,...meeting.speeches,...meeting.summary])assert.doesNotMatch(translate(value,'en'),/[\u3400-\u9fff]/,value);
 for(const p of people)assert.doesNotMatch(translate(p.role,'en'),/[\u3400-\u9fff]/);
 const a=recall(s,'Han','Prepare a monthly research report');const text=translate(a.text,'en');assert.match(text,/690/);assert.match(text,/15\.9/);assert.match(text,/66\.7/);assert.doesNotMatch(text,/[\u3400-\u9fff]/);
 for(const m of s.memories)for(const v of [m.title,m.text,m.source])assert.doesNotMatch(translate(v,'en'),/[\u3400-\u9fff]/,v);
 assert.equal(JSON.stringify(s),raw);assert.deepEqual(restore(raw),s);assert.equal(translate(a.text,'zh'),a.text);
});
test('English correction uses the same owner confirmation and sample checks',()=>{
 const s=initialState();const edited=englishSource(s.sourceText).replace('value is 690','value is 720');const result=saveAndExtract(s,edited,'Han');assert.equal(result.state.memories.find(m=>m.id==='data').value,720);assert.equal(result.state.memories.find(m=>m.id==='data').status,'pending');assert.throws(()=>confirmInPlace(result.state,'data','Han'));
 const confirmed=confirmInPlace(result.state,'data','Choi');assert.match(translate(recall(confirmed,'Han','Prepare the next meeting report').text,'en'),/12\.2/);
 const invalid=saveAndExtract(s,edited.replace('with 5 valid samples','with 7 valid samples'),'Han');assert.equal(invalid.state.sourceDirty,true);assert.equal(invalid.state.memories.find(m=>m.id==='data').value,undefined);
 const conflict=saveAndExtract(s,edited+' The reviewed value is 690 Ω·μm','Han');assert.equal(conflict.state.sourceDirty,true);
});
