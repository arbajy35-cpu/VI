#!/bin/sh
DIR="$(cd "$(dirname "$0")" && pwd)"
"$DIR/gradle-8.6/bin/gradle" "$@"
