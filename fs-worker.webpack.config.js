const
  _path =
    require(
      'path');
const
  _output_dir =
    _path.resolve(
      __dirname);
const
  _output_file_name =
    "./fs-worker.js";
const
  _output = {
    path:
      _output_dir,
    filename:
      _output_file_name
};

module.exports = {
  entry:
    './fs-worker',
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
      "@std/path":
        _path.resolve(
          __dirname,
          'node_modules/@std/path/mod.js'),
    }
  }
};
