==============
bin2txt
==============

--------------------------------------------------------
Binary To Text
--------------------------------------------------------
:Version: bin2txt |version|
:Manual section: 1

Synopsis
========

split-file  *option* *[arguments]*


Description
===========

Converts binary to ascii text.


Options
========

     -s                          Split the input file in
       <input>                   the given number of parts.
       <num_parts>

-f encoding_format      Encoding format ('base64').
-B buffer_size          Size in bytes the input file will
                        be split before being read
   		        in memory and passed to
   		        the encoder.
-L string_length        String chunk length.
-s                      Only print chunks amount.

-h                      Display help.
-c                      Enable color output
-v                      Enable verbose output


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



Bugs
====

https://github.com/themartiancompany/encoding-tools/-/issues

Copyright
=========

Copyright Pellegrino Prevete. AGPL-3.0.

See also
========

* base64
* txt2bin

.. include:: variables.rst
