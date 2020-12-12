module.exports = (curfew, func, then = undefined, thenCatch = undefined, ...funcArgs) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(reject, curfew, "Curfew of " + curfew + "ms has expired.");
        resolve(await func(...funcArgs)); 
    }).then(then, thenCatch);
};
