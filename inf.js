
'use strict';

const INCEPTION = require("./index");

exports.inf = async function (INF, ALIAS) {

    let handlers = {};

    let baseDir = null;
    let origin = null;

    return {

        invoke: async function (pointer, value) {

            if (/^on\./.test(pointer)) {
                let name = pointer.replace(/^on\./, "");
                if (!handlers[name]) handlers[name] = [];
                handlers[name].push(value);
                return true;
            } else
            if (pointer === "origin") {
                origin = value.value;
                return true;
            } else
            if (pointer === "toolchain") {
                baseDir = INF.LIB.PATH.resolve(value.value);
                return true;
            } else
            if (pointer === "run") {
                throw new Error("'run' is deprected! Use 'run()'");
            } else
            if (pointer === "run()") {
                if (!handlers[value.value]) {
                    console.error("handlers", handlers);
                    throw new Error(`No '${value.value}' handlers found to run!`);
                }

                if (!baseDir) {

                    const INIT_CWD = process.env.INIT_CWD || INF.LIB.PATH.join(process.cwd(), '../..');

                    if (!origin) {
                        origin = INF.LIB.PATH.basename(INIT_CWD);
                    }
                    baseDir = INF.LIB.PATH.dirname(INIT_CWD);
                }

                let toolchain = new INCEPTION.Toolchain(baseDir);
                toolchain.origin = origin;

                // We reset the handlers so that when new ones are added and then triggered
                // again it does not create an infinite loop.
                const handlerNodes = handlers[value.value];
//                delete handlers[value.value];

                const apiByAlias = {};
                return INF.LIB.Promise.mapSeries(handlerNodes, async function (node) {

                    apiByAlias[node.alias] = (await node.value(toolchain)).value;

                }).then(function (apis) {

                    return apiByAlias;
                });
            } else {
                console.error("value", value);
                throw new Error(`Unhandled pointer '${pointer}' for '${__filename}'!`);
            }
        }
    };
}
