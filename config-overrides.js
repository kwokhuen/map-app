const { override, fixBabelImports } = require("customize-cra");
const CompressionPlugin = require("compression-webpack-plugin");

const addCompressionPlugin = config => {
  config.plugins.push(new CompressionPlugin());
  return config;
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addCompressionPlugin
);
