
'use strict';

exports.inf = async function (inf) {

    return {

        id: "test/.../PromiseToRequestListener",

        interface: function (alias, node) {

            return async function (value) {

                if (value.contract[1].impl.id === "test/.../RequestListener") {

                    const handler = value.value;

                    value.value = async function (req, res) {

                        const response = await handler();
                        res.end(response);
                    };
    
                    return value;
                }
            }
        }
    };
}
