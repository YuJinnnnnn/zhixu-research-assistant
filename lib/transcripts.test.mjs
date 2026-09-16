import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, restore, act } from './memory.ts';
import {
  saveTranscript,
  versions,
  transcript,
  signature,
  generateSummary,
} from './transcripts.ts';
test('transcript edits retain every version, author and timestamp and survive reload', () => {
  let s = initialState();
  assert.equal(versions(s, 0, 0).length, 0);
  s = saveTranscript(
    s,
    0,
    0,
    'Revised target for review.',
    'Kim',
    '2026-09-16T01:00:00Z',
  );
  s = saveTranscript(
    s,
    0,
    0,
    'Second revision.',
    'Park',
    '2026-09-16T02:00:00Z',
  );
  s = restore(JSON.stringify(s));
  assert.equal(versions(s, 0, 0).length, 2);
  assert.equal(versions(s, 0, 0)[0].author, 'Kim');
  assert.equal(versions(s, 0, 0)[1].at, '2026-09-16T02:00:00Z');
  assert.throws(() => act(s, 'goal', 'confirm', 'Park'));
  assert.equal(saveTranscript(s, 0, 0, 'Second revision.', 'Park'), s);
});
test('summary timestamp and source version remain fixed until regeneration, including edited-back text', () => {
  let s = generateSummary(initialState(), 0, 'Han', '2026-09-16T00:00:00Z');
  const old = s.meetingSummaries[0],
    text = transcript(s, 0, 1);
  s = saveTranscript(s, 0, 1, 'A changed statement.', 'Kim');
  assert.notEqual(old.signature, signature(s, 0));
  assert.equal(s.meetingSummaries[0].generatedAt, '2026-09-16T00:00:00Z');
  s = saveTranscript(s, 0, 1, text, 'Kim');
  assert.notEqual(old.signature, signature(s, 0));
  s = generateSummary(s, 0, 'Han', '2026-09-16T03:00:00Z');
  assert.equal(s.meetingSummaries[0].signature, signature(s, 0));
  assert.equal(s.meetingSummaries[0].generatedAt, '2026-09-16T03:00:00Z');
});
test('Choi transcript correction retains history and triggers existing conservative extraction', () => {
  let s = initialState();
  s = saveTranscript(s, 2, 3, s.sourceText.replace('690', '720'), 'Choi');
  assert.equal(s.memories.find((m) => m.id === 'data').value, 720);
  assert.equal(versions(s, 2, 3).length, 1);
  assert.ok(versions(s, 2, 3)[0].at);
  assert.equal(s.memories.find((m) => m.id === 'data').status, 'pending');
});

test('an empty stored history has no user edit records', () => {
  const s = { ...initialState(), transcriptVersions: { '0:0': [] } };
  const history = versions(s, 0, 0);
  assert.equal(history.length, 0);
});
