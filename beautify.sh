#!/usr/bin/env bash
exe="node_modules/.bin/js-beautify"

dirs=(\
  "./public/" \
  "./public/pages/"
)

function main() {
    for dir in ${dirs[@]}
    do
      for entry in "$dir"*.html
      do
        $exe "$entry" -r --indent-size 2 --preserve-new-lines false --max-preserve-newlines 0 --wrap-line-length 0 --wrap-attributes-indent-size 0 --unformatted 'b em'
      done
    done
}

main
