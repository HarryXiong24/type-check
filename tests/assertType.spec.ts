import { checkType, checkKeys } from '../src';

const a = 1;
const b = true;
const c = 'abc';
const d = undefined;
const e: any[] = [];
const f: Record<never, never> = {};
const g = [1, 2, 3];
const h = ['a', 'b', 'c'];
const i = [1, 'b', 'c'];
const j = { a: 1, b: 2 };
const k = { a: 'a', b: 'b' };
const l = null;

describe('assert test', () => {
  it('should assert simple type', () => {
    expect(checkType(a, 'boolean')).toEqual(false);
    expect(checkType(b, 'boolean')).toEqual(true);
    expect(checkType(b, 'string')).toEqual(false);
    expect(checkType(b, { type: 'boolean', enum: [true] })).toEqual(true);
    expect(checkType(c, 'string')).toEqual(true);
    expect(checkType(c, 'undefined')).toEqual(false);
    expect(checkType(d, 'undefined')).toEqual(true);
    expect(checkType(d, 'number')).toEqual(false);
    expect(checkType(a, 'number')).toEqual(true);
    expect(checkType(l, 'null')).toEqual(true);
    expect(checkType(l, 'object')).toEqual(false);
    expect(checkType(l, 'number')).toEqual(false);
  });

  it('should assert type', () => {
    expect(checkType(e, 'object')).toEqual(false);
    expect(checkType(e, 'array')).toEqual(true);
    expect(checkType(f, 'array')).toEqual(false);
    expect(checkType(f, 'object')).toEqual(true);
    expect(checkType(g, 'array')).toEqual(true);
    expect(checkType(h, 'array')).toEqual(true);
    expect(checkType(i, 'array')).toEqual(true);
    expect(checkType(j, 'object')).toEqual(true);
    expect(checkType(k, 'object')).toEqual(true);
  });

  it('should assert specific type', () => {
    expect(checkType(g, 'string[]')).toEqual(false);
    expect(checkType(g, 'number[]')).toEqual(true);
    expect(checkType(h, 'number[]')).toEqual(false);
    expect(checkType(h, 'string[]')).toEqual(true);
    expect(checkType(i, 'number[]')).toEqual(false);
    expect(checkType(i, 'string[]')).toEqual(false);
    expect(checkType(j, 'Record<string,string>')).toEqual(false);
    expect(checkType(j, 'Record<string, string>')).toEqual(false);
    expect(checkType(j, 'Record<string,number>')).toEqual(true);
    expect(checkType(j, 'Record<string, number>')).toEqual(true);
    expect(checkType(k, 'Record<string,number>')).toEqual(false);
    expect(checkType(k, 'Record<string, number>')).toEqual(false);
    expect(checkType(k, 'Record<string,string>')).toEqual(true);
    expect(checkType(k, 'Record<string, string>')).toEqual(true);
  });

  it('should assert muti type', () => {
    expect(checkType(a, ['boolean', 'null'])).toEqual(false);
    expect(checkType(b, ['boolean', 'object'])).toEqual(true);
    expect(checkType(b, ['string', 'array'])).toEqual(false);
    expect(
      checkType(b, { type: ['string', 'array'], additional: [true] })
    ).toEqual(true);
    expect(checkType(h, ['number', 'string[]'])).toEqual(true);
    expect(checkType(h, ['number[]', 'string[]'])).toEqual(true);
    expect(checkType(i, ['number[]', 'string[]'])).toEqual(false);
    expect(
      checkType(j, ['Record<string, boolean>', 'Record<string, string>'])
    ).toEqual(false);
    expect(
      checkType(j, ['Record<string, number>', 'Record<string, string>'])
    ).toEqual(true);
    expect(
      checkType(k, ['Record<string, number>', 'Record<string, string>'])
    ).toEqual(true);
    expect(checkType(k, 'Record<string, string>')).toEqual(true);
  });

  it('should check keys', () => {
    expect(
      checkKeys({ title: 'a', desc: 'b' }, { title: 'string', desc: 'string' })
    ).toEqual(true);
    expect(
      checkKeys(
        { title: 'a', desc: 'b' },
        { title: ['boolean', 'string'], desc: ['string', 'number'] }
      )
    ).toEqual(true);
    expect(
      checkKeys(
        { title: 'a', desc: 'b', a: 1 },
        { title: 'string', desc: 'string' }
      )
    ).toEqual(false);
    expect(
      checkKeys({ title: 'a' }, { title: 'string', desc: 'string' })
    ).toEqual(false);
    expect(
      checkKeys({ title: 'a', desc: 3 }, { title: 'string', desc: 'string' })
    ).toEqual(false);
    expect(
      checkKeys(
        { title: 'a', desc: 'b' },
        { title: 'string', desc: 'string', content: 'array' }
      )
    ).toEqual(false);
  });
});
