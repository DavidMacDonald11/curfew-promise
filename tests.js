const curfewPromise = require("./index");

const Code = require("@hapi/code");
const Lab = require("@hapi/lab");

const { expect } = Code;
const { describe, it } = Lab.script();

describe("CurfewPromise", () => {
    describe("basic synchronous functions", () => {
        function sync1() { return 5; }
        function sync2(num) { return num; }
        function sync3(num1, num2) { return num1 + num2; }

        it("should resolve 5", async () => {
            expect(await curfewPromise(10000, sync1)).to.equal(5);
        });

        it("should resolve 4", async () => {
            expect(await curfewPromise(10000, sync2, 4)).to.equal(4);
        });

        it("should resolve -5.86", async () => {
            expect(await curfewPromise(10000, sync3, 3.14, -9)).to.equal(3.14 - 9);
        });
    });
});
