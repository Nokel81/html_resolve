# telegram
Node module to help with importing non-static html

> Named after the older form of long distant communication before telephones and email. Represents the ability to send a message to anyone you want to

API
------

```javascript
const telegram = require("telegram");

const telegram_abs = telegram.absolute;

const telegram_rel = telegram.relative(__dirname);
```

#### telegram(file, data, silent?)
Returns a string representing the contents of file `file` with all the data hooks contained replaced with the corresponding data in `data`.

Use `telegram_abs` when passing in a absolute path and `telegram_rel` for relative paths.

`file` is a `String` representing the file path. Both relative and absolute paths work. Though this is intended to be an html file, this is not restricted so that this can be used with any markup file format.

`data` is a `Object` that matches data hook names to data. The value will have `toString()` called on it.

`silent` is a `Boolean` that makes hooks that do not exist in `data` fail silently and are just removed from the outputted file.

The data hook format is the follow: `{hook_name}` anyway within the given file will be replace with `data_val` if the following data object is provided:

```JSON
{
    "hook_name": "data_val"
}
```

`data` may contain more hooks then required but if a hook does not exist in data then a `Error: hook not found` error will be thrown.

To escape the matching place a `\` in front of the `{{hook_name}}`, like this: `\{{hook}`. The `\` will be removed in the outputted text.

LICENSE
======
This package is licenced under MIT. (c) 2017
