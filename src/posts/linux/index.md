---
title: "LINUX"
date: "2021-04-27"
updated: "2021-04-27"
author: Villager Liao
keywords:
  - linux
  - command
---

# LINUX

## Command Line

Basic

- `echo`
- `pwd`(Print Working Directory)
- `cd`(Change Directory)

```bash
$ cd .
$ cd ..
$ cd ~
# previous directory
$ cd -
```

- `ls`(List Directories)

```bash
# a for hidden directories
$ ls -a
# l for long
$ ls -l
# combine flag
$ ls -al
$ ls -la
# recursively list directory contents
$ ls -R
# reverse order while sorting
$ ls -r
# sort by modification time, newest first
$ ls -t
```

- `touch`(Create new empty files)

Touch is also used to change timestamps on existing files and directories.

- `file`(To find out what kind of file a file is)

- `cat`(Displays file contents and can combine multiple files and show you the output)

- `less`(Look at the contents of a file with less)
  - q - Used to quit out of less and go back to your shell.
  - Page up, Page down, Up and Down - Navigate using the arrow keys and page keys.
  - g - Moves to beginning of the text file.
  - G - Moves to the end of the text file.
  - /search - You can search for specific text inside the text document. Prefacing the words you want to search with /
  - h - If you need a little help about how to use less while you’re in less, use help

- `hostory`(History of the commands that you previously entered)

- `clear`(Clear up diaplay)

- `cp`(Copy)
  - \* the wildcard of wildcards, it's used to represent all single characters or any string.
  - ? used to represent one character
  - [] used to represent any character within the brackets

```bash
# Copy all files with the .jpg extension in your current directory to the Pictures directory
$ cp *.jpg /home/pete/Pictures
# Recursively copy the files and directories within a directory
$ cp -r Pumpkin/ /home/pete/Documents
# i flag (interactive) to prompt you before overwriting a file
$ cp -i mycoolfile /home/pete/Pictures
```

- `mv`(Move)

```bash
# Rename
$ mv oldfile newfile
$ mv directory1 directory2
# move files to a different directory
$ mv file_1 file_2 /somedirectory
# i flag to prompt you before overwriting anything
# You can also make a backup of that file and it will just rename the old version with a ~.
$ mv -b directory1 directory2
```

- `mkdir`(Make Directory)

```bash
# make multiple directories at the same time
$ mkdir books paintings
# create subdirectories at the same time with the -p (parent flag)
$ mkdir -p books/hemmingway/favorites
```

- `rm`(Remove)

```bash
# force delete (as long as you have the appropriate permissions)
$ rm -f file1
# remove directory
$ rm -r directory
$ rmdir directory
```

- `find`

```bash
# specify what type of file you are trying to find
# (d) for directory
$ find /home -type d -name MyFolder
```

- `help``man``whatis`

```bash
# built-in bash command that provides help for other bash commands
$ help echo
# the manuals for a command
$ man ls
# provides a brief description of command
$ whatis cat
```

- `alias`

add a permanent alias in `~/.bashrc`

```bash
# create an alias for a command
$ alias foobar='ls -la'
# remove aliases
$ unalias foobar
```

- `exit``logout`

## Reference

- [Linux Journey](https://linuxjourney.com/)
