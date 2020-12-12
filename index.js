module.exports = (curfew, func, then = undefined, thenCatch = undefined, ...funcArgs) => {
    return new Promise(async (resolve, reject) => {
        new Promise(async () => { resolve(await func(...funcArgs)); });

        await new Promise((r) => { setTimeout(r, curfew); });

        reject("Curfew of " + curfew + "ms has expired.");
    }).then(then, thenCatch);
};
