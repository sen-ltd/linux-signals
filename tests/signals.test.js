import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SIGNALS, findByNumber, findByName, searchSignals, filterByAction } from '../src/signals.js';

// ──────────────────────────────────────────
// Data integrity
// ──────────────────────────────────────────
describe('SIGNALS array', () => {
  it('has at least 30 entries', () => {
    assert.ok(SIGNALS.length >= 30, `Expected >= 30, got ${SIGNALS.length}`);
  });

  it('all signal numbers are unique', () => {
    const nums = SIGNALS.map(s => s.number);
    const unique = new Set(nums);
    assert.equal(unique.size, nums.length, 'Duplicate signal numbers detected');
  });

  it('all signal names start with SIG', () => {
    const bad = SIGNALS.filter(s => !s.name.startsWith('SIG'));
    assert.deepEqual(bad, [], `Signals not starting with SIG: ${bad.map(s => s.name).join(', ')}`);
  });

  it('every entry has required fields', () => {
    const required = ['number', 'name', 'defaultAction', 'canCatch', 'canIgnore', 'canBlock', 'origin', 'description', 'useCases', 'example'];
    for (const sig of SIGNALS) {
      for (const field of required) {
        assert.ok(field in sig, `Signal ${sig.name} missing field: ${field}`);
      }
    }
  });

  it('every description has ja and en keys', () => {
    for (const sig of SIGNALS) {
      assert.ok(typeof sig.description.ja === 'string', `${sig.name}: missing description.ja`);
      assert.ok(typeof sig.description.en === 'string', `${sig.name}: missing description.en`);
    }
  });

  it('every useCases has ja and en arrays', () => {
    for (const sig of SIGNALS) {
      assert.ok(Array.isArray(sig.useCases.ja), `${sig.name}: useCases.ja not an array`);
      assert.ok(Array.isArray(sig.useCases.en), `${sig.name}: useCases.en not an array`);
    }
  });

  it('defaultAction is one of Term, Core, Ign, Stop, Cont', () => {
    const valid = new Set(['Term', 'Core', 'Ign', 'Stop', 'Cont']);
    for (const sig of SIGNALS) {
      assert.ok(valid.has(sig.defaultAction), `${sig.name}: invalid defaultAction "${sig.defaultAction}"`);
    }
  });
});

// ──────────────────────────────────────────
// findByNumber
// ──────────────────────────────────────────
describe('findByNumber', () => {
  it('returns SIGKILL for number 9', () => {
    const sig = findByNumber(9);
    assert.ok(sig !== null);
    assert.equal(sig.name, 'SIGKILL');
  });

  it('returns SIGTERM for number 15', () => {
    const sig = findByNumber(15);
    assert.ok(sig !== null);
    assert.equal(sig.name, 'SIGTERM');
  });

  it('returns null for non-existent number', () => {
    assert.equal(findByNumber(999), null);
  });

  it('returns null for number 0', () => {
    assert.equal(findByNumber(0), null);
  });

  it('returns SIGHUP for number 1', () => {
    const sig = findByNumber(1);
    assert.ok(sig !== null);
    assert.equal(sig.name, 'SIGHUP');
  });
});

// ──────────────────────────────────────────
// findByName
// ──────────────────────────────────────────
describe('findByName', () => {
  it('finds SIGKILL by full name', () => {
    const sig = findByName('SIGKILL');
    assert.ok(sig !== null);
    assert.equal(sig.number, 9);
  });

  it('finds SIGKILL case-insensitively', () => {
    const sig = findByName('sigkill');
    assert.ok(sig !== null);
    assert.equal(sig.name, 'SIGKILL');
  });

  it('finds SIGTERM without SIG prefix', () => {
    const sig = findByName('TERM');
    assert.ok(sig !== null);
    assert.equal(sig.name, 'SIGTERM');
  });

  it('finds SIGHUP without SIG prefix (lowercase)', () => {
    const sig = findByName('hup');
    assert.ok(sig !== null);
    assert.equal(sig.name, 'SIGHUP');
  });

  it('finds SIGINT with full lowercase name', () => {
    const sig = findByName('sigint');
    assert.ok(sig !== null);
    assert.equal(sig.number, 2);
  });

  it('returns null for unknown name', () => {
    assert.equal(findByName('SIGFOO'), null);
  });

  it('returns null for empty string', () => {
    assert.equal(findByName(''), null);
  });
});

// ──────────────────────────────────────────
// searchSignals
// ──────────────────────────────────────────
describe('searchSignals', () => {
  it('returns all signals for empty query', () => {
    assert.equal(searchSignals('').length, SIGNALS.length);
  });

  it('finds signal by number string', () => {
    const results = searchSignals('9');
    assert.ok(results.some(s => s.name === 'SIGKILL'));
  });

  it('finds signal by name fragment', () => {
    const results = searchSignals('KILL');
    assert.ok(results.some(s => s.name === 'SIGKILL'));
  });

  it('finds signal by lowercase name fragment', () => {
    const results = searchSignals('term');
    assert.ok(results.some(s => s.name === 'SIGTERM'));
  });

  it('finds signal by English description keyword', () => {
    const results = searchSignals('breakpoint');
    assert.ok(results.some(s => s.name === 'SIGTRAP'));
  });

  it('finds signal by Japanese description keyword', () => {
    const results = searchSignals('ハングアップ');
    assert.ok(results.some(s => s.name === 'SIGHUP'));
  });

  it('returns empty array for no match', () => {
    const results = searchSignals('zzznomatch999');
    assert.equal(results.length, 0);
  });

  it('search is case-insensitive for name', () => {
    const results = searchSignals('sigint');
    assert.ok(results.some(s => s.name === 'SIGINT'));
  });
});

// ──────────────────────────────────────────
// filterByAction
// ──────────────────────────────────────────
describe('filterByAction', () => {
  it('filters to Term signals only', () => {
    const results = filterByAction('Term');
    assert.ok(results.length > 0);
    assert.ok(results.every(s => s.defaultAction === 'Term'));
  });

  it('filters to Core signals only', () => {
    const results = filterByAction('Core');
    assert.ok(results.length > 0);
    assert.ok(results.every(s => s.defaultAction === 'Core'));
  });

  it('filters to Ign signals', () => {
    const results = filterByAction('Ign');
    assert.ok(results.length > 0);
    assert.ok(results.every(s => s.defaultAction === 'Ign'));
  });

  it('filters to Stop signals', () => {
    const results = filterByAction('Stop');
    assert.ok(results.length > 0);
    assert.ok(results.every(s => s.defaultAction === 'Stop'));
  });

  it('filters to Cont signals', () => {
    const results = filterByAction('Cont');
    assert.ok(results.length > 0);
    assert.ok(results.every(s => s.defaultAction === 'Cont'));
  });

  it('returns empty for invalid action', () => {
    assert.deepEqual(filterByAction('Unknown'), []);
  });
});

// ──────────────────────────────────────────
// SIGKILL and SIGSTOP special properties
// ──────────────────────────────────────────
describe('SIGKILL and SIGSTOP are uncatchable', () => {
  it('SIGKILL cannot be caught', () => {
    const sig = findByNumber(9);
    assert.equal(sig.canCatch, false);
  });

  it('SIGKILL cannot be ignored', () => {
    const sig = findByNumber(9);
    assert.equal(sig.canIgnore, false);
  });

  it('SIGKILL cannot be blocked', () => {
    const sig = findByNumber(9);
    assert.equal(sig.canBlock, false);
  });

  it('SIGSTOP cannot be caught', () => {
    const sig = findByNumber(19);
    assert.equal(sig.canCatch, false);
  });

  it('SIGSTOP cannot be ignored', () => {
    const sig = findByNumber(19);
    assert.equal(sig.canIgnore, false);
  });

  it('SIGSTOP cannot be blocked', () => {
    const sig = findByNumber(19);
    assert.equal(sig.canBlock, false);
  });

  it('SIGTERM can be caught (unlike SIGKILL)', () => {
    const sig = findByNumber(15);
    assert.equal(sig.canCatch, true);
  });

  it('SIGTSTP can be caught (unlike SIGSTOP)', () => {
    const sig = findByNumber(20);
    assert.equal(sig.canCatch, true);
  });
});
