const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// What I want the function to do
// Take in raw code as a string
// Write that code to a file
// Run that code 
// Return if the code is correct
// Return the error and where the error is if the code is incorrect


module.exports = {
    evalCode: async (req, res) => {
        try {
            await main(req.body.code);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.json({ error: err.message, stack: err.stack });
        }
    }
}
