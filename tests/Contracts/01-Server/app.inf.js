
'use strict';

exports.inf = async function (INF, ALIAS) {

    const routes = [];

    return {

        ServerRoute: async function (route, app) {

            routes[route] = app;

            return true;
        },

        invoke: async function (pointer, value) {

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
