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
    "./libsplit-file.js";
const
  _output =
  { path:
      _output_dir,
    filename:
      _out_file_name };
module.exports = {
  entry:
    './libsplit-file',
  output:
    _output,
  optimization: {
    moduleIds: 'deterministic',
  },
  resolve: {
    fallback: {
      "fs":
        _path.resolve(
          __dirname,
          'node_modules/@themartiancompany/fs/fs'),
      "path":
        _path.resolve(
          __dirname,
          'node_modules/@std/path/mod.js'),
      "web-worker":
        false
    },
  },
};
