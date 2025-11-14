#!/usr/bin/env node

// SPDX-License-Identifier: AGPL-3.0-or-later

//    ----------------------------------------------------------------------
//    Copyright © 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
//                2023, 2024, 2025
//                Tom Valk
//    Copyright © 2025
//                Pellegrino Prevete
//
//    All rights reserved
//    ----------------------------------------------------------------------
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as
//    published by the Free Software Foundation, either version 3 of
//    the License, or (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.
//
//    You should have received a copy of the GNU Affero General Public License
//    along with this program.  If not, see <https://www.gnu.org/licenses/>.


const
  _split_file_module =
    require(
      '../lib/split-file');
_merge_files =
  split_file_module.merge_files;
_split_file_by_size =
  _split_file_module.split_file_by_size;
const
  fs =
    require(
      'fs');
const
  crypto =
    require('crypto');
const
  testRoot =
    __dirname;
const
  testSubFolders = [
    'test1',
    'test2',
    'output'];

function
  cleanUp() {
  testSubFolders.forEach(
    (subFolder) => {
      const
        folder =
          fs.readdirSync(
            testRoot +
            '/files/' +
            subFolder +
            '/');
      folder.forEach(
        (fileName) => {
          if ( fileName.indexOf(
                 'sf-part') != -1 ||
               fileName.indexOf(
                 '.out') != -1) {
            fs.unlinkSync(
              testRoot +
              '/files/' +
              subFolder +
              '/' +
              fileName);
          }
        });
    });
}

function
  checksum(
    str,
    algorithm,
    encoding) {
  return crypto.createHash(
           algorithm ||
           'md5').update(
             str,
             'utf8').digest(
               encoding ||
               'hex');
}

function
  checksumFile(
    file,
    algorithm,
    encoding) {
  const
    data =
      fs.readFileSync(
        file);
  return checksum(
           data,
           algorithm ||
           'md5',
           encoding ||
           'hex');
}

const
  md5Zip =
    '561a3c354bbca14cf501d5e252383387';
const
  md5Pdf =
    '6bb492c383240fcd87b5c42958c2e482';

describe(
  'split and merge on size',
  () => {
    test(
      'should create the parts based on bytes of split parts',
      (done) => {
        const
          input =
            __dirname +
            '/files/test1/sample.zip';
        const
          inputStat =
            fs.statSync(
              input);
        const
          splitSize =
            100000;
        return _split_file_by_size(
                 input,
                 splitSize).then(
                 (parts) => {
                   let
                     totalPartsSize = 0;
                   parts.forEach(
                     (part) => {
                     const
                       stat =
                         fs.statSync(
                           part);
                     expect(
                       stat.size).toBeLessThanOrEqual(
                         splitSize);
                     totalPartsSize +=
                       stat.size;
                     });
                   expect(
                     totalPartsSize).toBe(
                       inputStat.size);
                   done();
                 }).catch(
                   (_error) => {
                     console.error(
                       _error);
                     expect(
                       _error).toBeNull();
                     done();
                   });
      });
    test(
      'should merge the splitted files',
      (done) => {
        const
          files =
            [];
        const
          base =
            __dirname + '/files/test1/sample.zip.sf-part';
        const
          output =
            __dirname +
            '/files/test1/sample.out';
        const
          input =
            __dirname +
            '/files/test1/sample.zip';
        const
          dir =
            fs.readdirSync(
              testRoot +
              '/files/test1/');
        dir.forEach(
          (file) => {
            if ( file.indexOf(
                   'sf-part') != -1) {
              files.push(
                testRoot +
                '/files/test1/' +
                file);
            }
        });
        _merge_files(
          files,
          output)
          .then(
            () => {
              const
                originalStat =
                  fs.statSync(input);
              const
                mergedStat =
                  fs.statSync(
                    output);
              expect(
                mergedStat.size).toBe(
                  originalStat.size);
              expect(
                md5Zip).toBe(
                  checksumFile(output));
              done();
            }).catch(
              (_error) => {
                console.error(
                  _error);
                expect(
                  _error).toBeNull();
                done();
            });
      });
    afterAll(
      () => {
        cleanUp();
    });
});

describe(
  'split and merge on number of parts',
  () => {
    test(
      'should create the parts based on number of given parts',
      (done) => {
        const
          input =
            __dirname +
            '/files/test2/sample.pdf';
        const
          inputStat =
            fs.statSync(input);
        const
          numberOfParts =
            512;
        return _split_file(
                 input,
                 numberOfParts).then(
                 (parts) => {
                   let
                     totalPartsSize =
                       0;
                   parts.forEach(
                     (part) => {
                       const
                         stat =
                           fs.statSync(
                             part);
                       totalPartsSize +=
                         stat.size;
                     });
                   expect(
                     totalPartsSize).toBe(
                       inputStat.size);
                   done();
                   }).catch(
                   (_error) => {
                     console.error(
                       _error);
                     expect(
                       _error).toBeNull();
                     done();
                   });
      });
    test(
      'should merge the splitted files',
      (done) => {
        const
          files =
            [];
        const
          base =
            __dirname +
            '/files/test2/sample.pdf.sf-part';
        const
          output =
            __dirname +
            '/files/test2/sample.out';
        const
          input =
          __dirname +
          '/files/test2/sample.pdf';
        const
          dir =
            fs.readdirSync(
              testRoot +
              '/files/test2/');
        dir.forEach(
          (file) => {
            if ( file.indexOf(
                   'sf-part') != -1 ) {
              files.push(
                testRoot +
                '/files/test2/' +
                file);
            }
          });
        _merge_files(
          files,
          output)
          .then(
            () => {
              const
                originalStat =
                  fs.statSync(
                    input);
              const
                mergedStat =
                  fs.statSync(
                    output);
              expect(
                mergedStat.size).toBe(
                  originalStat.size);
              expect(
                md5Pdf).toBe(
                  checksumFile(
                    output));
              done();
            }).catch(
              (_error) => {
                console.error(
                  _error);
                expect(
                  _error).toBeNull();
                done();
            });
      });
    afterAll(
      () => {
        cleanUp();
      });
});

describe(
  'split files to destination folder',
  () => {
    test(
      'should output files to specific folder',
      (done) => {
        const
          input =
            __dirname +
            '/files/test2/sample.pdf';
        const
          outputFolder =
            __dirname +
            '/files/output';
        if (! fs.existsSync(
                outputFolder)) {
          fs.mkdirSync(
            outputFolder);
        }
        const
          inputStat =
            fs.statSync(
              input);
        const
          numberOfParts =
            512;
        return _split_file(
                 input,
                 numberOfParts,
                 outputFolder).then(
                   (parts) => {
                   let
                     totalPartsSize =
                       0;
                   parts.forEach(
                     (part) => {
                       const
                         stat =
                           fs.statSync(
                             part);
                       totalPartsSize +=
                         stat.size;
                     });
                   expect(
                     totalPartsSize).toBe(
                       inputStat.size);
                   const
                     dirFiles =
                       fs.readdirSync(
                         outputFolder);
                   expect(
                     dirFiles.length).toBe(
                       numberOfParts);
                   done();
    	           }).catch(
                     (_error) => {
                       console.error(
                         _error);
                       expect(
                         _error).toBeNull();
                       done();
                   });
      });
    afterAll(
      () => {
        cleanUp();
      });
  });
