
//process.env.VERBOSE = 1;

const ASSERT = require("chai").assert;
const INF = require("@pinf-it/inf");

it('01-RequestListener', function (done) {

    const inf = new INF.INF(__dirname, null, {});
    inf.runInstructionsFile("inf.json").then(async function (api) {
        
        const response = await api['org.pinf.genesis.inception'].app("/");

        ASSERT.equal(response, '<html>Hello World</html>');

        done();
    }, done);

});
