const EvalCode = require('../utils/codeHandler.js');

// What I want the function to do
// Take in raw code as a string
// Write that code to a file
// Run that code 
// Return if the code is correct
// Return the error and where the error is if the code is incorrect


module.exports = {
    evalCode: async (req, res) => {
        try {
            const { code, language, testCaseInfo } = req.body;
            const e = new EvalCode(code, language, testCaseInfo);
            const result = await e.main();
            res.status(200).send(result);
        } catch(err) {
            res.status(500).send({ err_message: err.message, err_stack: err.stack });
        }
    },

    evalMultiple: async (req, res) => {
        try {
            const allResults = {};
            const { code, language, allTests } = req.body;
            for (let i = 0; i < allTests.length; i++) {
                const e = new EvalCode(code, language, allTests[i]);
                const result = await e.main();
                console.log(result);
                allResults[i+1] = result;
            }
            res.status(200).send(allResults);
        } catch(err) {
            res.status(500).send({ err_message: err.message, err_stack: err.stack });
        }
    }
}
