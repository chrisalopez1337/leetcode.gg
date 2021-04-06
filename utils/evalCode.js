const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const write = promisify(require('fs').writeFile);

class EvalCode {
    constructor(code, language, testCase) {
        this.code = code;
        this.language = language;
        this.testCase = testCase;
    }

    async run() {
        try {
            // First configure the data 
            this.formatFileName();
            this.formatCommand();
            this.formatCode();
            // Run the code
            await this.writeFile();
            await this.runCode();
            // Return results
            const results = 
                {
                    stdout: this.stdout,
                    stderr: this.stderr,
                }
            if (this.err) {
                results['error'] = { message: this.err.message, stack: this.err.stack }
            }
            return results;
        } catch(err) {
            throw new Error(err);
        }
    }

    formatFileName() {
        const options =
            {
                javascript: '.js',
            }
        const extension = options[`${this.language}`];
        this.fileName = `eval${extension}`;
    }

    formatCommand() {
        const options =
            {
                javascript: 'node'
            }
        const command = options[`${this.language}`];
        this.command = `${command} ${this.fileName}`;
    }

    formatCode() {
        // Check if the last index of the string is ; or not.
        if (this.code[this.code.length-1] !== ';') {
            this.code += ';';
        }
        const options = {
            javascript: `console.log(${this.testCase})`
        }
        const printCode = options[`${this.language}`];
        this.code += printCode;
    }

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
}
// Testing
const code = `const addTwo = (a,b) => a + b;`
const language = 'javascript';
const testCase = `addTwo(1,2)`;

const main = async (code, language, testCase) => {
    try {
        const e = new EvalCode(code, language, testCase);
        const response = await e.run();
        return response;
    } catch(err) {
        console.log(err);
    }
}

module.exports = main;
