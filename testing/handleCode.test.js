const { expect } = require('chai');
const assert = require('assert');
const EvalCode = require('../utils/codeHandler.js');

describe('EvalCode class', async () => {
    it('Should be able to format a file name properly', () => {
        const code = `const returnArr = (arr) => arr;`
        const testCaseInfo = { expected: [1, 2, 3], case: `returnArr({1, 2, 3})` };
        const language = 'javascript';
        const e = new EvalCode(code, language, testCaseInfo);
        e.formatFileName();
        expect(e.get('fileName')).to.equal('eval.js');
    });
    it('Should be able to format a file name properly', () => {
        const code = 
            `def getX(x):
                return x`;
        const testCaseInfo = { expected: 1, case: `getX(1)` };
        const language = 'python';
        const e = new EvalCode(code, language, testCaseInfo);
        e.formatFileName();
        expect(e.get('fileName')).to.equal('eval.py');
    });
});