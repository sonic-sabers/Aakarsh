/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      // babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      // assetExts: assetExts.filter(ext => ext !== "svg"),
      assetExts: [...assetExts, "obj", "mtl", "JPG", "OBJ", "vrx", "hdr", "gltf", "glb", "GLB", "bin", "arobject", "gif", "fbx"],
      sourceExts: [...sourceExts, "svg", "obj", "OBJ"]
    }
  };
})();
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };
