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

    __init__() {
        this.formatFileName();
        this.formatRunCommand();
    }

    formatFileName() {
        const languageOptions = 
            {
                javascript: '.js',
                python: '.py',
            };
        const key = this.language;
        const extension = languageOptions[key];
        this.fileName = `eval${extension}`;
    }

    formatRunCommand() {
        // Cant be run without a valid fileName
        if (!this.fileName) {
            throw new Error('Need to run: formatFileName prior to building a run command.');
            return;
        }
        const languageOptions =
            {
                javascript: 'node',
                python: 'python3',
            }
        const key = this.language;
        const command = languageOptions[key];
        this.command = `${command} ${this.fileName}`;
    }
}

module.exports = EvalCode;
