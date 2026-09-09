import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,restore,act,editSource,extract,checkExtraction,recall} from './memory.ts';
const question='准备明天的研究汇报';
function confirmed(){let s=checkExtraction(initialState(),'Han');s=act(s,'data','confirm','Choi');return act(s,'decision','confirm','Park')}
test('刷新存档与空白新会话保留确认状态，不需要旧对话',()=>{
 const state=restore(JSON.stringify(confirmed()));assert.equal(state.sessions.length,0);
 assert.match(recall(state,'Han',question).text,/690/);assert.match(recall(state,'Han',question).text,/15.9%/);
 assert.match(recall(state,'Han',question).text,/66.7%/);
});
test('不保存、忘记与本次停用在统一调用入口生效',()=>{
 let s=act(initialState(),'data','reject','Han');assert.doesNotMatch(recall(s,'Han',question).text,/690|610|15.9/);
 s=act(confirmed(),'data','forget','Choi');assert.equal(s.memories.find(m=>m.id==='data').text,'');
 assert.doesNotMatch(recall(restore(JSON.stringify(s)),'Han',question).text,/690|15.9/);
 assert.doesNotMatch(recall(confirmed(),'Han',question,['data']).text,/690|15.9/);
 assert.equal(confirmed().memories.find(m=>m.id==='data').status,'confirmed');
});
test('转录修正后停止引用，再提取核查确认使用新数字',()=>{
 let s=confirmed();const revision=s.revision;
 s=editSource(s,s.sourceText.replace('690','720'),'Kim');assert.equal(s.sourceAuthor,'Kim');assert.equal(s.sourceHistory.length,1);
 assert.ok(s.revision>revision);assert.doesNotMatch(recall(s,'Han',question).text,/690|720|15.9/);
 assert.throws(()=>act(s,'data','confirm','Choi'));
 s=extract(s,'Han');assert.throws(()=>act(s,'data','confirm','Choi'));
 s=checkExtraction(s,'Han');s=act(s,'data','confirm','Choi');
 const answer=recall(s,'Han',question);assert.match(answer.text,/720/);assert.match(answer.text,/12.2%/);assert.doesNotMatch(answer.text,/690|15.9/);
});
test('歧义或未知口径不产生伪造候选',()=>{
 let s=editSource(confirmed(),'需要重新测试，目前没有结果。','Han');assert.throws(()=>extract(s,'Han'));
 s=editSource(confirmed(),initialState().sourceText+' 复核后应为 710 Ω·μm。','Han');assert.throws(()=>extract(s,'Han'));
});
test('私人笔记的内容与元数据不向其他角色泄露，共享仍为署名假设',()=>{
 let s=confirmed();let a=recall(s,'Han',question);assert.ok(![...a.used,...a.skipped].some(m=>m.id==='private'));
 assert.doesNotMatch(a.text,/Wang 的个人假设/);assert.throws(()=>act(s,'private','share','Han'));
 s=act(s,'private','share','Wang');a=recall(s,'Han',question);assert.match(a.text,/Wang 的个人假设/);assert.match(a.text,/不代表团队共识/);
 s=act(s,'private','unshare','Wang');assert.doesNotMatch(recall(s,'Han',question).text,/Wang 的个人假设/);
});
test('其他项目与无关问题不会触发错误调用',()=>{
 let a=recall(confirmed(),'Han',question);assert.ok(a.skipped.some(m=>m.id==='other'));assert.doesNotMatch(a.text,/30%/);
 a=recall(confirmed(),'Han','帮我挑选晚餐菜单');assert.equal(a.used.length,0);assert.doesNotMatch(a.text,/690|75%/);
});
test('忘记不会自行复活，主动从来源提取仍需核查',()=>{
 let s=act(confirmed(),'data','forget','Choi');assert.throws(()=>act(s,'data','confirm','Choi'));
 s=extract(s,'Han');assert.equal(s.memories.find(m=>m.id==='data').status,'pending');assert.equal(s.extracted,false);
 assert.doesNotMatch(recall(s,'Han',question).text,/690/);
});
test('无效存档明确拒绝而非静默接受',()=>{
 assert.throws(()=>restore('{'));assert.throws(()=>restore(JSON.stringify({schema:2})));
 const s=confirmed();s.memories[0].status='bad';assert.throws(()=>restore(JSON.stringify(s)));
});
