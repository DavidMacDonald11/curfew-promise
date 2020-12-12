const defaultOptions = {
    curfew: 1000,
    checks: 10,
    wait: 1000 / 10
};

module.exports = (customOptions = undefined) => {
    options = getOptions(customOptions);

    
}

function getOptions(customOptions) {
    if(typeof customOptions !== "object") return defaultOptions;

    const customCurfew = typeof customOptions.curfew === "number";
    const customChecks = typeof customOptions.checks === "number";

    const options = {};

    options["curfew"] = (customCurfew) ? customOptions.curfew : defaultOptions.curfew;
    options["checks"] = (customChecks) ? customOptions.checks : defaultOptions.checks;
    options["wait"] = options.curfew / options.checks;

    return options;
}
