const { expect } = require('chai');
const assert = require('assert');
const EvalCode = require('../utils/codeHandler.js');

describe('EvalCode class', async () => {
    // JS
    it('Should be able to format a file name properly', () => {
        const code = `const returnArr = (arr) => arr;`
        const testCaseInfo = { expected: [1, 2, 3], case: `returnArr({1, 2, 3})` };
        const language = 'javascript';
        const e = new EvalCode(code, language, testCaseInfo);
        e.formatFileName();
        expect(e.get('fileName')).to.equal('eval.js');
    });
    //Python
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

    //JS
    it('Should be able to format a run command properly', () => {
        const code = `const returnArr = (arr) => arr;`
        const testCaseInfo = { expected: [1, 2, 3], case: `returnArr({1, 2, 3})` };
        const language = 'javascript';
        const e = new EvalCode(code, language, testCaseInfo);
        e.__init__();
        expect(e.get('command')).to.equal('node eval.js');
    });
    //Python
    it('Should be able to format a run command properly', () => {
        const code = 
            `def getX(x):
                return x`;
        const testCaseInfo = { expected: 1, case: `getX(1)` };
        const language = 'python';
        const e = new EvalCode(code, language, testCaseInfo);
        e.__init__();
        expect(e.get('command')).to.equal('python3 eval.py');
    });

    //JS
    it('Should be able to format code properly to get the STDOUT/STDERR', () => {
        const code = `const returnArr = (arr) => arr`
        const testCaseInfo = { expected: [1, 2, 3], case: `returnArr([1, 2, 3])` };
        const language = 'javascript';
        const e = new EvalCode(code, language, testCaseInfo);
        e.__init__();
        const expected = `const returnArr = (arr) => arr;console.log(returnArr([1, 2, 3]))`;
        expect(e.get('code')).to.equal(expected);
    });

    //JS
    it('Should be able to run code', async () => {
        const code = `const addTwo = (a, b) => a + b`
        const testCaseInfo = { expected: 3, case: `addTwo(1, 2)` };
        const language = 'javascript';
        const e = new EvalCode(code, language, testCaseInfo);
        e.__init__();
        await e.writeFile();
        await e.runCode();
        expect(e.get('stdout')).to.equal('3\n');
    });

    //JS
    it('Should be able to collect results', async () => {
        const code = `const returnArr = (a) => a`
        const testCaseInfo = { expected: [1, 2, 3], case: `returnArr([1, 2, 3])` };
        const language = 'javascript';
        const e = new EvalCode(code, language, testCaseInfo);
        await e.main();
        assert.deepEqual(e.get('output'), [1, 2, 3])
    });
});
