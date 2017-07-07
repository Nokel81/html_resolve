const fs = require("fs");
const path = require("path");

function html_resolve(file, data, silent) {
    if (typeof data !== "object" || !data) {
        throw new Error("data is not defined");
    }
    let orig_file = fs.readFileSync(file);
    if (orig_file === null) {
        throw new Error("EISDIR: illegal operation on a directory, read");
    }
    orig_file = orig_file.toString();
    let replaced_file = orig_file.replace(/[^\\]{{(.*?)}}/g, (match, hook) => {
        if (!data.hasOwnProperty(hook)) {
            if (silent) {
                return match[0] || "";
            }
            throw new Error("hook not found: " + hook);
        }
        return match[0] + data[hook].toString();
    });
    return replaced_file.replace(/\\{{/g, "{{");
}

module.exports = {
    relative: function (dirname) {
        return function (file, data, silent) {
            return html_resolve(path.join(dirname, file), data, silent);
        };
    },
    absolute: html_resolve
};
