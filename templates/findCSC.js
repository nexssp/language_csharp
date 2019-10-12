const fglob = require("fast-glob");

fglob.sync(["c:/**/csc.exe"]).forEach(e => console.log(e));
