#!/usr/bin/gmake -f

### Script: makefile
##
## ファイルを作成する。
##
## Metadata:
##
##   id - 8ca50b16-73ee-4cfb-9911-a27106e70ca0
##   author - <qq542vev at https://purl.org/meta/me/>
##   version - 1.0.1
##   date - 2024-06-06
##   since - 2024-06-03
##   copyright - Copyright (C) 2024-2024 qq542vev. Some rights reserved.
##   license - <CC-BY at https://creativecommons.org/licenses/by/4.0/>
##   package - bookmarklet-generator
##
## See Also:
##
##   * <Project homepage at https://github.com/qq542vev/bookmarklet-generator>
##   * <Bag report at https://github.com/qq542vev/bookmarklet-generator>

# Macro
# =====

VERSION = 1.0.1
SRC = src
MIN = minified

.PHONY: all clean help version

all: ${MIN}/index.html

${MIN}/index.html: ${SRC}/index.html ${MIN}/1F517.svg ${MIN}/25B6.svg ${MIN}/274C.svg ${MIN}/main.js ${MIN}/style.css
	npx html-inline -i '${<}' --ignore-links | npx html-minifier --collapse-whitespace --conservative-collapse --keep-closing-slash --remove-comments >'${@}'

${MIN}/%.css: ${SRC}/%.css
	mkdir -p -- '${@D}'
	npx cleancss -O1 'specialComments:off' '${<}' >'${@}'

${MIN}/%.js: ${SRC}/%.js
	mkdir -p -- '${@D}'
	npx browserify '${<}' | npx uglifyjs --compress >'${@}'

${MIN}/%.svg: ${SRC}/%.svg
	mkdir -p -- '${@D}'
	npx svgo '${<}' -o - >'${@}'

# Clean
# =====

clean:
	rm -rf -- ${MIN}

# Message
# =======

help:
	@echo 'ファイルを作成する。'
	@echo
	@echo 'USAGE:'
	@echo '  make [OPTION...] [TARGET...]'
	@echo
	@echo 'TARGET:'
	@echo '  all     全てのファイルを作成する。'
	@echo '  clean   作成したファイルを削除する。'
	@echo '  help    このメッセージを表示する。'
	@echo '  version バージョン情報を表示する。'

version:
	@echo '${VERSION}'
