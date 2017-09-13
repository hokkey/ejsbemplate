#!/usr/bin/env bash

dest="./src/view/pages"
sassFile="_pages.scss"
json=$(cat conf/pages.json)
items=$(echo $json | jq 'keys[]')
len=$(echo $json | jq '. | length')

function main() {
  for i in $( seq 0 $(($len - 1)) ); do
    page=$(echo $json | jq -r keys[$i])
    if [ -e "./$page.ejs" ]; then
      echo "$page is already available."
    else
      if test "$page" != 'dummy' ; then
        ../../../node_modules/.bin/yo ejspageplate $page
        echo "@import '"$page"';" >> "$sassFile"
      fi
    fi
  done
}

cd $dest
main
