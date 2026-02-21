// SPDX-License-Identifier: AGPL-3.0-or-later


/**    ----------------------------------------------------------------------
 *     webpack.config.js
 *     ----------------------------------------------------------------------
 *     Copyright ©
 *       Pellegrino Prevete
 *         2025, 2026
 * 
 *     All rights reserved
 *     ----------------------------------------------------------------------
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
