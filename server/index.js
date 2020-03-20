require("dotenv").config({path: `${__dirname}/../.env`});

require("regenerator-runtime/runtime");

require("@babel/register")({
  ignore: [/\/(build|node_modules)\//],
  presets: ["@babel/preset-env"],
  plugins: ["dynamic-import-node", "@babel/plugin-syntax-dynamic-import"],
});

require("./server");
