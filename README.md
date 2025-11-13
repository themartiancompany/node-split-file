[comment]: <> (SPDX-License-Identifier: AGPL-3.0)

[comment]: <> (-------------------------------------------------------------)
[comment]: <> (Copyright © 2015, 2016, 2017, 2018, 2019, 2020)
[comment]: <> (            2021, 2022, 2023, 2024, 2025)
[comment]: <> (            Tom Valk)
[comment]: <> (            2025)
[comment]: <> (            Pellegrino Prevete)
[comment]: <> (All rights reserved)
[comment]: <> (-------------------------------------------------------------)
[comment]: <> (This program is free software: you can redistribute)
[comment]: <> (it and/or modify it under the terms of the GNU Affero)
[comment]: <> (General Public License as published by the Free)
[comment]: <> (Software Foundation, either version 3 of the License.)

[comment]: <> (This program is distributed in the hope that it will be useful,)
[comment]: <> (but WITHOUT ANY WARRANTY; without even the implied warranty of)
[comment]: <> (MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the)
[comment]: <> (GNU Affero General Public License for more details.)

[comment]: <> (You should have received a copy of the GNU Affero General)
[comment]: <> (Public License along with this program.)
[comment]: <> (If not, see <https://www.gnu.org/licenses/>.)


# Split File

[![Build Status](
     https://travis-ci.org/tomvlk/node-split-file.svg?branch=master)](
       https://travis-ci.org/tomvlk/node-split-file)

Split and merge file in multiple parts.
Splittable with number of parts or maximum bytes per part.

It works both in Node.js and in web browsers.

## Programmatically usage
This section contains information on how to use the
`split-file` module in your code.

### Installation

You can install and save an entry to your `package.json`
with the following command:

```bash
npm \
  install \
    --save \
    split-file
```

### Usage

All methods return a `Promise` (`bluebird`)
which results in some respose if some.

#### Splitting file with number of parts

```javascript
_split_file(
  _file,
  _dest?) => Promise<string[]>
```

**Consumes**:
- `_file`:
    Path to the file to split.
- `_dest`:
    Folder for output, defaults to `.` (current folder)

**Produces**:
- `Promise<string[]>`:
    Promise with results in an array of part
    names (full paths) of the splitted files.

#### Example

```javascript
const
  _split_file_module =
    require(
      'split-file');
_split_file =
  _split_file_module._split_file;
_split_file(
  __dirname + '/testfile.bin',
  3)
  .then(
    (names) => {
      console.log(
        names);
    })
  .catch(
    (err) => {
      console.log(
        'Error: ',
        err);
    });
```

#### Splitting file with maximum bytes per part

```javascript
_split_file_by_size(
  _file,
  _size_max,
  _dest?) => Promise<string[]>
```

**Consumes**:
- `_file`:
    Path to the file to split.
- `_size_max`:
    Max size of the splitted parts. (bytes)
- `_dest`:
    Folder for output, defaults to `.` (current folder)

**Produces**:
- `Promise<string[]>`:
    Promise with results in an array of part
    names (full paths) of the splitted files.

##### Example

```javascript
const
  _split_file_module =
    require(
      'split-file');
_split_file_by_size =
  _split_file_module._split_file_by_size;
_split_file_by_size(
  __dirname + '/testfile.bin',
  457000)
  .then(
    (names) => {
      console.log(
        names);
    })
  .catch(
    (err) => {
      console.log(
        'Error: ',
        err);
  });
```

#### Merge parts

```javascript
_merge_files(
  _input_files,
  _output_file) => Promise<>
```

**Consumes**:
- `_names`:
    Input files, array with full part paths.
- `_output_file`:
    Full path of the output file.

**Produces**:
- `Promise<>`:
    Promise that results in an empty resolving.

##### Example

```javascript
const
  _split_file_module =
    require(
      'split-file');
_merge_files =
  _split_file_module._merge_files;
_files = [
  __dirname + '/file_a',
  __dirname + '/file_b'
];
_merge_files(
  _files,
  __dirname + '/testfile-output.bin')
  .then(
    () => {
      console.log(
        'Done!');
    })
  .catch(
    (err) => {
      console.log(
        'Error: ',
        err);
    });
```

## CLI Tool

### Installation

To use the module from the command-line you can install
this package in your global context:
```
npm \
  -g \
  install \
    "split-file"
```

**Note:** You may need admin rights (`sudo`,
`su -c` or on Windows `Run as administrator`).

### Usage

The CLI tool works like you use it in your own package.

```
Usage:

  split-file
    <option>
    [arguments]

  options:

     -s                          Split the input file in
       <input>                   the given number of parts.
       <num_parts>

     -x
       <input>
       <max_size>                Split the input file into
                                 multiple parts with maximum
                                 file size of max_size bytes.

     -m                          Merge the given parts into
       <output>                  the output file.
       <part>
       <part> ...
        
  examples:
  
     split-file \
       -s \
       "input.bin" \
       5
  
     split-file \
       -x \
       "input.bin" \
       457000
  
     split-file \
       -m \
       "output.bin" \
       "part1" "part2" ...
```

# License

Work authored by Tom Valk is released under the terms
of the MIT license;
work authored by Pellegrino Prevete is released
under the terms of the GNU Affero General Public License
version 3.
