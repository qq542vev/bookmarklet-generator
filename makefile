#!/usr/bin/gmake -f

# Macro
# =====

VERSION = 1.0.0
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
	@echo 'all     全てのファイルを作成する。'
	@echo 'clean   作成したファイルを削除する。'
	@echo 'help    このメッセージを表示する。'
	@echo 'version バージョン情報を表示する。'

version:
	@echo ${VERSION}
