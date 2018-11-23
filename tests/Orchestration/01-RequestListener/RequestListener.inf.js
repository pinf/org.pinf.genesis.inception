
'use strict';

exports.inf = async function (inf) {

    return {

        id: "test/.../RequestListener",

        contract: function (alias, node) {

            return async function (value) {

                const handler = value.value;

                value.value = async function (req, res) {

                    return handler(req, res);
                };

                return value;
            }
        }
    };
}
