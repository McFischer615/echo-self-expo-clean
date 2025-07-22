const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("cjs");
config.resolver.sourceExts = ["jsx", "js", "ts", "tsx"];
config.transformer = {
  babelTransformerPath: require.resolve("react-native-css-transformer"),
};

module.exports = config;
