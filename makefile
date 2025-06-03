#!/usr/bin/gmake -f

### Script: makefile
##
## ファイルを作成する。
##
## Metadata:
##
##   id - 8ca50b16-73ee-4cfb-9911-a27106e70ca0
##   author - <qq542vev at https://purl.org/meta/me/>
##   version - 1.2.0
##   created - 2024-06-03
##   modified - 2025-06-03
##   copyright - Copyright (C) 2024-2025 qq542vev. Some rights reserved.
##   license - <CC-BY-4.0 at https://creativecommons.org/licenses/by/4.0/>
##   depends - browserify, cleancss, echo, html-inline, html-minifier, npx, rm, shellspec, svgo, tidy, uglifyjs, xdg-open
##   package - bookmarklet-generator
##
## See Also:
##
##   * <Project homepage at https://github.com/qq542vev/bookmarklet-generator>
##   * <Bag report at https://github.com/qq542vev/bookmarklet-generator>

# Sp Targets
# ==========

.PHONY: all run pre-check post-check other-check clean rebuild help version

.SILENT: help version

# Macro
# =====

VERSION = 1.2.0

SRC = src
MIN = minified

# Build
# =====

all: index.html

index.html: ${MIN}/index.html ${MIN}/1F517.svg ${MIN}/25B6.svg ${MIN}/274C.svg ${MIN}/main.js ${MIN}/style.css
	npx html-inline -i '${<}' --ignore-links | npx html-minifier --collapse-whitespace --conservative-collapse --keep-closing-slash --remove-comments >'${@}'

${MIN}/%.html: ${SRC}/%.html
	mkdir -p -- '${@D}'
	npx html-minifier --collapse-whitespace --conservative-collapse --keep-closing-slash --remove-comments '${<}' >'${@}'

${MIN}/%.css: ${SRC}/%.css
	mkdir -p -- '${@D}'
	npx cleancss -O1 'specialComments:off' '${<}' >'${@}'

${MIN}/%.js: ${SRC}/%.js
	mkdir -p -- '${@D}'
	npx browserify '${<}' | npx uglifyjs --compress >'${@}'

${MIN}/%.svg: ${SRC}/%.svg
	mkdir -p -- '${@D}'
	npx svgo '${<}' -o - >'${@}'

# Run
# ===

run: index.html
	xdg-open '${<}'

# Check
# =====

pre-check:
	shellspec -- 'spec/pre'

post-check: index.html
	shellspec -- 'spec/post'

other-check:
	shellspec -- 'spec/other'

# Docs
# ====

LICENSE.txt:
	curl -sS -f -L -o '$(@)' -- 'https://creativecommons.org/licenses/by/4.0/legalcode.txt'

# Clean
# =====

clean:
	rm -rf -- index.html ${MIN}

rebuild: clean all

# Message
# =======

help:
	echo 'ファイルを作成する。'
	echo
	echo 'USAGE:'
	echo '  make [OPTION...] [TARGET...]'
	echo
	echo 'TARGET:'
	echo '  all     全てのファイルを作成する。'
	echo '  run     メインのファイルを開く。'
	echo '  pre-check'
	echo '	  ビルド前の検査を行う。'
	echo '  post-check'
	echo '	  ビルド後の検査を行う。'
	echo '  other-check'
	echo '	  その他の検査を行う。'
	echo '  clean   作成したファイルを削除する。'
	echo '  rebuild cleanの実行後にallを実行する。'
	echo '  help    このヘルプを表示して終了する。'
	echo '  version バージョン情報を表示して終了する。'

version:
	echo '${VERSION}'
