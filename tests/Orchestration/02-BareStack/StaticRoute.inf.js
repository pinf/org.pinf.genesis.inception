
'use strict';

exports.inf = async function (INF) {

    return {

        interface: function (alias, node) {

            return async function (value) {

                if (value.contract[1].impl.id === "test/.../Promise") {

                    const path = value.value;

                    value.value = async function () {

                        return INF.LIB.FS.readFileAsync(INF.LIB.PATH.join(value.baseDir, path), "utf8");
                    };

                    return value;
                }
            }
        }
    };
}
