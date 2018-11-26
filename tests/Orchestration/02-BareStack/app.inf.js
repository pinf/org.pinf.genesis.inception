
'use strict';

exports.inf = async function (INF, ALIAS) {

    const routes = [];

    return {
        invoke: async function (pointer, value) {

            if (
                value.contract &&
                value.contract[1].impl.id === "test/.../RequestListener"
            ) {

                routes[pointer] = await value.value;

                return true;
            } else
            if (pointer === "init()") {

                return async function (uri) {

                    const done = INF.LIB.Promise.defer();

                    const req = {};
                    const res = {
                        end: function (body) {
                            done.resolve(body);
                        }
                    };
                    await routes[uri](req, res);
    
                    return done.promise;
                }
            }
        }        
    }
}
