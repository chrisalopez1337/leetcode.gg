const main = require('../utils/evalCode.js');

// What I want the function to do
// Take in raw code as a string
// Write that code to a file
// Run that code 
// Return if the code is correct
// Return the error and where the error is if the code is incorrect


module.exports = {
    evalCode: async (req, res) => {
        try {
            const { code, language, testCase } = req.body;
            const response = await main(code, language, testCase);
            res.status(200).send(response);
        } catch(err) {
            console.log(err);
            res.json({ error: err.message, stack: err.stack });
        }
    }
}
