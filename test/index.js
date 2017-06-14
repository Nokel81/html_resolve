const chai = require("chai");
const html_resolve = require("../index");
const path = require("path");

const expect = chai.expect;

chai.should();

describe("Basic Error Tests", function () {
    it("should throw an error if data is not passed in", function () {
        let html_resolve_absolute = html_resolve.absolute;
        try {
            html_resolve_absolute(__dirname);
        } catch (e) {
            e.message.should.equal("data is not defined");
        }
    });

    it("should throw an eror when trying in read a directory", function () {
        let html_resolve_absolute = html_resolve.absolute;
        try {
            html_resolve_absolute(__dirname, {});
        } catch (e) {
            e.message.should.equal("EISDIR: illegal operation on a directory, read");
        }
    });

    it("should throw an error if the hook is not contained in data", function () {
        let html_resolve_relative = html_resolve.relative(__dirname);
        try {
            html_resolve_relative("./test1.html", {});
        } catch (e) {
            e.message.should.equal("hook not found");
        }
    })
});

describe("Basic Success Tests", function () {
    it("should replace the hook with only a hook", function () {
        let html_resolve_relative = html_resolve.relative(__dirname);
        html_resolve_relative("./test1.html", {hook: "value"}).should.equal("{{hook}}\r\n");
    });

    it("should replace the hook with only a hook in a <p> tag", function () {
        let html_resolve_relative = html_resolve.relative(__dirname);
        html_resolve_relative("./test2.html", {hook: "value"}).should.equal("<p>value</p>\r\n");
    });

    it("should ignore escaped brackets", function () {
        let html_resolve_relative = html_resolve.relative(__dirname);
        html_resolve_relative("./test3.html", {hook: "value"}).should.equal("{{hook}}\r\n");
    });
})
