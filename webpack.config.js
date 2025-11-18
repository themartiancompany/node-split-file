const
  _path =
    require(
      'path');
const
  _output_dir =
    _path.resolve(
      __dirname);
const
  _out_file_name =
    "./split-file.js";
const
  _output =
  { path:
      _output_dir,
    filename:
      _out_file_name };
module.exports = {
  entry:
    './split-file',
  output:
    _output,
  optimization: {
    moduleIds: 'deterministic',
  },
  resolve: {
    fallback: {
      "fs":
        false,
      "opfs":
        _path.resolve(
          __dirname,
          'node_modules/opfs/dist/main.mjs'),
      "path":
        false,
      "stream":
        false,
      "@std/path":
        _path.resolve(
          __dirname,
          'node_modules/@std/path/mod.js'),
      "yargs":
        false,
      "yargs/helpers":
        false
    },
  },
};
