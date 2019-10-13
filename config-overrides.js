const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");

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
  addWebpackAlias({
    ["@ant-design/icons/lib/dist$"]: path.resolve(
      __dirname,
      "./src/components/Icons.tsx"
    )
  }),
  addCompressionPlugin
);
