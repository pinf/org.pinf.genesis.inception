
exports.inf = async function (INF, ALIAS) {

    const SUFFIX = ALIAS.split("/").pop();

    return {

        id: `org.pinf.genesis.inception/contracts/${SUFFIX}`,

        contract: function (pointer, value) {

//console.log("--- interface ---", ALIAS, pointer, value);

            if (
                // TODO: Resolve dynamically
                SUFFIX === "ServerMiddleware" ||
                SUFFIX === "ServerRoute"
            ) {
                return async function (value) {

                    // TODO: Intercept or validate.

                    return value;
                }
            }
        },

        interfaceWrapper: function (interfaceComponent) {

            if (SUFFIX === "ServerMiddleware") {
                return function (alias, node) {

                    return async function (value) {

                        const method = value.contract[0].replace(`${value.contract[1].namespacePrefix || ''}/`, "");

                        if (typeof interfaceComponent[method] !== "function") {
                            throw new Error(`Interface at '${interfaceComponent.alias}' does not export '${method}' as required by contract '${value.contract[1].impl.id}'!`);
                        }
                        
                        // Only give the value to the interface implementation
                        value.value = await interfaceComponent[method].call({
                            baseDir: value.baseDir
                        }, value.value);

                        return value;
                    }
                };
            }
        }
    };
}
