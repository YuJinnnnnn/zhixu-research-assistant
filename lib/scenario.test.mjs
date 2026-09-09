import test from 'node:test';
import assert from 'node:assert/strict';
import {meetings,people} from './scenario.ts';
test('同一六人团队的三次会议共十八段发言',()=>{assert.equal(people.length,6);assert.equal(meetings.length,3);for(const m of meetings)assert.equal(m.speeches.length,6)});
