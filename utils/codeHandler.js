const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const write = promisify(require('fs').writeFile);
const assert = require('assert');
const _ = require('lodash');

const code = `const returnArr = (arr) => arr;`
const testCase1 = { expected: [1, 2, 3], case: `returnArr([1, 2, 3])` };
const language = 'javascript';

// Will have to do a lot of work to port in Python and other langauges. Going to continue with Javascript as a MVP as it can all be compiled on one line.

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
        this.formatCode();
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

    formatCode() {
        const testCase = this.testCaseInfo.case;
        const languageOptions =
            {
                javascript: `console.log(${testCase})`,
                python: `print(${testCase})`,
            }
        const key = this.language;
        const addition = languageOptions[key];
        // Edge case handlers
        if (this.language === 'javascript') {
            if (this.code[this.code.length-1] !== ';') {
                this.code += ';';
            }
            this.code += addition;
        } else if (this.language === 'python') {
            this.code = 
            `${this.code}
             ${addition}`;
        }
    }
    // Should generate a better path.
    async writeFile() {
        try {
            await write(this.fileName, this.code);
        } catch(err) {
            throw new Error(err);
        }
    }

    async runCode() {
        try {
            const { stderr, stdout } = await exec(this.command);
            this.stderr = stderr;
            this.stdout = stdout;
        } catch(err) {
            this.err = err;
        }
    }

    compare() {
        const { testCaseInfo, stdout } = this;
        const expected = testCaseInfo.expected;
        if (this.err || stdout.length < 1) { return false };
        
        let parsedAnswer = stdout;
        parsedAnswer = parsedAnswer.split('\n').join('');
        if (parsedAnswer.indexOf('}') > -1) {
            let obj = {}
            let answer = eval("obj =" + parsedAnswer);
            parsedAnswer = answer;
        } else {
            parsedAnswer = JSON.parse(parsedAnswer);
        }

        this.output = parsedAnswer;

        return _.isEqual(parsedAnswer, expected);
    }

    getResult() {
        const { stderr, stdout, err, testCaseInfo } = this;
        this.result = 
            {
                stderr,
                stdout,
                equal: false,
                output: null,
                err: {
                    err_message: null,
                    err_stack: null,
                }
            }
        if (err?.message) {
            this.result.err.err_message = err.message;
            this.result.err.err_stack = err.stack;
            return;
        }
        this.result.equal = this.compare();
        this.result.output = this.output;
    }

    async main() {
        try {
            this.__init__();
            await this.writeFile();
            await this.runCode();
            this.getResult();
            return this.result;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = EvalCode;
