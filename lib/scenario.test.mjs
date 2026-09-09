import test from 'node:test';
import assert from 'node:assert/strict';
import { initialReview, confirmReview, makeReport, meetings, people } from './scenario.ts';

test('每次会议覆盖同一六人团队，共十八段发言',()=>{
 assert.equal(people.length,6);assert.equal(meetings.length,3);
 for(const meeting of meetings)assert.equal(meeting.speeches.length,6);
});
test('整理者不能确认科研修订；数据确认前必须完成来源核查',()=>{
 assert.throws(()=>confirmReview(initialReview,'data','Han'));
 assert.throws(()=>confirmReview(initialReview,'data','Choi'));
 const extracted=confirmReview(initialReview,'extraction','Han');
 assert.throws(()=>confirmReview(extracted,'decision','Choi'));
 assert.equal(extracted.data,false);
});
test('新报告不把未确认修订当作已复核结论，也不采纳旧降幅',()=>{
 const report=makeReport(initialReview);
 assert.match(report,/版本冲突/);assert.match(report,/暂不引用/);
 assert.doesNotMatch(report,/25.6%/);assert.doesNotMatch(report,/相对降幅 15.9%/);
});
test('核查、数据负责人确认、决策确认后生成一致的月报',()=>{
 let state=confirmReview(initialReview,'extraction','Han');
 state=confirmReview(state,'data','Choi');
 let report=makeReport(state);
 assert.match(report,/690 Ω·μm/);assert.match(report,/15.9%/);assert.match(report,/尚待 Park 确认/);
 state=confirmReview(state,'decision','Park');report=makeReport(state);
 assert.match(report,/9 月 23 日/);assert.match(report,/66.7%/);assert.match(report,/B 组未达门槛/);
 assert.doesNotMatch(report,/610|25.6/);
 assert.equal(initialReview.data,false);
});
