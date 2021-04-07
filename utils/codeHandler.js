const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const write = promisify(require('fs').writeFile);

const code = `const returnArr = (arr) => arr;`
const testCase1 = { expected: [1, 2, 3], case: `returnArr([1, 2, 3])` };
const language = 'javascript';

class EvalCode {
    constructor(code, language, testCaseInfo) {
        this.code = code;
        this.language = language
        this.testCaseInfo = testCaseInfo;
   }

    get(key) {
        return this[key];
    }

    formatFileName() {
        const languageOptions = 
            {
                javascript: '.js',
                python: '.py',
            };
        const key = this.language;
        const extension = languageOptions[key];
        this.fileName = 'eval' + extension;
    }
}

module.exports = EvalCode;
