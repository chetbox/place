#!/usr/bin/env node

const fs = require('fs');

const filename = process.argv[2];
let typescript = fs.readFileSync(filename).toString();

// Fix properties which look like numbers
typescript = typescript.replace(/([\n^] )*([0-9]+)(\??:)/g, "$1'$2'$3");

// Use Typescript number type
typescript = typescript.replace(/\bNumber\b/g, "number");

// Fix types which are aliases of other types
typescript = typescript.replace(/([\n^])export interface +([a-zA-Z0-9_]+) extends +([a-zA-Z0-9_]+) +{\n}/g, "$1export type $2 = $3;");

fs.writeFileSync(filename, typescript);
