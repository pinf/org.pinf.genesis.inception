
'use strict';

exports.inf = async function (inf) {

    return {

        id: "test/.../Promise",

        contract: function (alias, node) {

            return async function (value) {

                if (Promise.resolve(value.value) == value.value) {
                    throw new Error("Value is not a Promise!");
                }

                return value;
            }
        }
    };
}
