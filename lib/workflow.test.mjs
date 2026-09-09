import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,recall} from './memory.ts';
import {confirmInPlace,saveAndExtract} from './workflow.ts';
test('原地确认合并提取核查与数据确认，但保留负责人边界',()=>{
 const s=initialState();assert.throws(()=>confirmInPlace(s,'data','Han'));
 const next=confirmInPlace(s,'data','Choi');assert.equal(next.extracted,true);assert.equal(next.memories.find(m=>m.id==='data').status,'confirmed');
 assert.equal(s.extracted,false);assert.match(recall(next,'Han','研究汇报').text,/690/);
});
test('修改即自动重新提取，不自动确认；失败仍保存修订并失效旧数据',()=>{
 const s=confirmInPlace(initialState(),'data','Choi');
 const good=saveAndExtract(s,s.sourceText.replace('690','720'),'Kim');assert.equal(good.state.sourceDirty,false);assert.equal(good.state.extracted,false);assert.equal(good.state.memories.find(m=>m.id==='data').status,'pending');
 assert.doesNotMatch(recall(good.state,'Han','研究汇报').text,/690|720/);
 const bad=saveAndExtract(s,'结果尚不明确，等待复测。','Kim');assert.equal(bad.state.sourceDirty,true);assert.equal(bad.state.sourceAuthor,'Kim');assert.doesNotMatch(recall(bad.state,'Han','研究汇报').text,/690/);
});
