const
  _path =
    require(
      'path');
const
  _output_dir =
    _path.resolve(
      __dirname);
const
  _file_name =
    "fs-worker.js";
const
  _output = {
    path:
      _output_dir,
    filename:
      _file_name
};

module.exports = {
  entry:
    './node_modules/crash-js/crash-js/fs-worker',
  output:
    _output,
  optimization: {
    moduleIds: 'deterministic',
  },
  resolve: {
    fallback: {
      "fs":
        false,
      "happy-opfs":
        _path.resolve(
          __dirname,
          'node_modules/happy-opfs/dist/main.mjs'),
      "path":
        false,
      "@std/path":
        _path.resolve(
          __dirname,
          'node_modules/@std/path/mod.js'),
    }
  }
};
