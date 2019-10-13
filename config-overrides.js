const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");
const rewireCompressionPlugin = require("react-app-rewire-compression-plugin");
const path = require("path");

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
  rewireCompressionPlugin
);
