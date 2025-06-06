### File: Dockerfile
##
## Dockerイメージを作成する。
##
## Usage:
##
## ------ Text ------
## docker image build -f Dockerfile
## ------------------
##
## Metadata:
##
##   id - 196408bf-60f1-4b77-9e4a-227012c16c84
##   author - <qq542vev at https://purl.org/meta/me/>
##   version - 1.0.2
##   created - 2025-05-31
##   modified - 2025-06-05
##   copyright - Copyright (C) 2025-2025 qq542vev. All rights reserved.
##   license - <GNU GPLv3 at https://www.gnu.org/licenses/gpl-3.0.txt>
##
## See Also:
##
##   * <Project homepage at https://github.com/qq542vev/bookmarklet-generator>
##   * <Bag report at https://github.com/qq542vev/bookmarklet-generator>

ARG BASE="docker.io/library/debian:12-slim"

FROM ${BASE}

ARG BASE
ARG TITLE="Bookmarklet Generator"
ARG VERSION="1.0.2"
ARG WORKDIR="/work"

LABEL org.opencontainers.image.title="${TITLE}"
LABEL org.opencontainers.image.description="${TITLE}のビルド・テスト用のイメージ。"
LABEL org.opencontainers.image.authors="qq542vev <https://purl.org/meta/me/>"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.url="https://github.com/qq542vev/bookmarklet-generator"
LABEL org.opencontainers.image.license="GPL-3.0-only"
LABEL org.opencontainers.image.base.name="${BASE}"

ENV LANG="C"
ENV LC_ALL="C"
ENV TZ="UTC0"

WORKDIR ${WORKDIR}
COPY package.json package-lock.json ${WORKDIR}

RUN \
	apt-get update && \
	apt-get install -y --no-install-recommends \
		curl git make nodejs npm tidy && \
	curl -fsSL -- 'https://git.io/shellspec' | sh -s -- -p '/usr/local' -y && \
	npm ci && npm cache clean --force && \
	apt-get purge -y curl git && \
	apt-get autoremove -y && \
	apt-get clean && \
	rm -rf /var/lib/apt-get/lists/*
