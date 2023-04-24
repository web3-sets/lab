import Ajv from 'ajv';
import { SchemaSetSmartContract } from '../src/schemas';
import addFormats from 'ajv-formats';

import SetEmpty from './schemas/set.smartcontract.empty.json';
import SetMinimal from './schemas/set.smartcontract.minimal.json';
import SetComplete from './schemas/set.smartcontract.complete.json';
import SetMeta from './schemas/set.smartcontract.meta.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validator = ajv.compile(SchemaSetSmartContract);

describe('schema:set.smartcontract', () => {
  it('is valid', () => {
    expect(ajv.validateSchema(SchemaSetSmartContract)).toEqual(true);
  });

  function checkSchema(schema: any, valid: boolean): void {
    const isValid = validator(schema);
    if(!isValid) {
      console.error(validator.errors);
    }
    expect(isValid).toEqual(valid);
  }

  it('validate:set.smartcontract.empty.json', () => {
    checkSchema(SetEmpty, true);
  });

  it('validate:set.smartcontract.minimal.json', () => {
    checkSchema(SetMinimal, true);
  });
  
  it('validate:set.smartcontract.complete.json', () => {
    checkSchema(SetComplete, true);
  });

  it('validate:set.smartcontract.meta.json', () => {
    checkSchema(SetMeta, true);
  });
});
