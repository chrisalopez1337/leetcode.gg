const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const write = promisify(require('fs').writeFile);

class EvalCode {
    constructor(code, language, testCase) {
        this.code = code;
        this.language = language;
        this.testCase = testCase;
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
            console.log(`stderr => ${stderr}`);
            console.log(`stdout => ${stdout}`);
        } catch(err) {
            console.log(err);
        }
    }
}
const code = `const addTwo = (a,b) => a + b;`
const language = 'javascript';
const testCase = `addTwo(1,2)`;

const main = async () => {
    const e = new EvalCode(code, language, testCase);
    e.formatFileName();
    e.formatCommand();
    e.formatCode();
    await e.writeFile();
    await e.runCode();
}

main();
