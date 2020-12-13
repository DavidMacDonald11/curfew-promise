module.exports = (curfew, func, ...args) => {
    let waitId;

    async function wait() {
        await new Promise((resolve) => { waitId = setTimeout(resolve, curfew); });
        return Promise.reject(new Error("Curfew of " + curfew + "ms have elapsed."));
    }

    async function perform() {
        const value = await func(...args);
        if(waitId) clearTimeout(waitId);
        return Promise.resolve(value);
    }
    
    return Promise.race([wait(), perform()]);
}
