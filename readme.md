<!-- Document: readme.md

	「Bookmarklet Generator」の日本語マニュアル。

	Metadata:

		id - 6ed745e6-ba1a-4d85-8bdb-046d72d04f51
		author - <qq542vev at https://purl.org/meta/me/>
		version - 0.0.1
		date - 2023-03-13
		since - 2020-04-20
		copyright - Copyright (C) 2020-2023 qq542vev. Some rights reserved.
		license - <CC-BY at https://creativecommons.org/licenses/by/4.0/>
		package - bookmarklet-generator

	See Also:

		* <Project homepage at https://github.com/qq542vev/bookmarklet-generator>
		* <Bug report at https://github.com/qq542vev/bookmarklet-generator/issues>
-->

# Bookmarklet Generator

[Bookmarklet Generator](https://purl.org/meta/bookmarklet-generator/) はブックマークレットの作成を手助けする、Webアプリケーションです。以下の機能を備えております。

 * CodeMirror によるコード作成の補助。
   * JavaScript のシンタクッスハイライト。
   * 自動インデント。
   * 括弧と引用符の補完。
 * UglifyJS による JavaScript コードの圧縮。
 * ブックマークレットの実行。
 * ブックマークレット毎の共有 URL を提供。
 * URL エンコードする文字を指定が可能。
 * [ダウンロード](https://purl.org/meta/bookmarklet-generator/download)すればオフライン環境でも使用が可能。

# ライセンス

Bookmarklet Generator のライセンスは [LICENSE ファイル](LICENSE)に準じます。但し Bookmarklet Generator 内で使用したライブラリについてはライブラリ提供元のライセンスが適用されます。

 * [normalize.css](https://necolas.github.io/normalize.css/) - [ライセンス](licenses/normalize.css.md)
 * [jQuery](https://jquery.com/) - [ライセンス](licenses/jquery.txt)
 * [CodeMirror](https://codemirror.net/5/) - [ライセンス](licenses/codemirror.txt)
 * [UglifyJS](https://lisperator.net/uglifyjs/) - [ライセンス](licenses/uglify-js.txt)
 * [Openmoji](https://openmoji.org/) - [ライセンス](licenses/openmoji.txt)

https://purl.org/meta/bookmarklet-generator/#code=(function()+%7B%0D%0A%09if(window.clipboardData)+%7B%0D%0A%09%09window.clipboardData.setData('Text'%2C+document.title)%3B%0D%0A%09%7D+else+if(navigator.clipboard)+%7B%0D%0A%09%09navigator.clipboard.writeText(document.title)%3B%0D%0A%09%7D+else+%7B%0D%0A++++++++prompt(%22Select+and+copy+the+text.%22%2C+document.title)%3B%0D%0A++++%7D%0D%0A%7D)()%3B&name=Copy+page+title&optimize=uglifyjs

