import Ajv from 'ajv';
import { SchemaSetMeta } from '../src/schemas';
import addFormats from 'ajv-formats';

import SetEmpty from './schemas/set.meta.empty.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validator = ajv.compile(SchemaSetMeta);

function checkSchema(schema: any, valid: boolean): void {
    const isValid = validator(schema);
    // expect(validator.errors).toMatchSnapshot();
    if(!isValid) {
        console.log(validator.errors);
    }
    expect(isValid).toEqual(valid);
}

describe('schema:set:meta', () => {
  it('is valid', () => {
    expect(ajv.validateSchema(SchemaSetMeta)).toEqual(true);
  });

  it('validates: empty set schema template', () => {
    checkSchema(SetEmpty, true);
  });
});
