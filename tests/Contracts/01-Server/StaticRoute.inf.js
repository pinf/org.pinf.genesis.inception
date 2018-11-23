
'use strict';

exports.inf = async function (INF) {

    return {

        ServerMiddleware: async function (path) {

            const self = this;
            
            return function (req, res, next) {

                INF.LIB.FS.readFileAsync(INF.LIB.PATH.join(self.baseDir, path), "utf8").then(function (body) {

                    res.end(body);
                }).catch(next);
            };
        }
    };
}
