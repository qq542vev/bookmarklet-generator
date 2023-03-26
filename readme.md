<!-- Document: readme.md

	「Bookmarklet Generator」の日本語マニュアル。

	Metadata:

		id - 6ed745e6-ba1a-4d85-8bdb-046d72d04f51
		author - <qq542vev at https://purl.org/meta/me/>
		version - 0.1.0
		date - 2023-03-26
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

# ブックマークレット集

 * 非リダイレクトのブックマークレット
   * [Copy page title](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20if%28window.clipboardData%29%20%7B%0D%0A%20%20%20%20%20%20%20%20window.clipboardData.setData%28%22Text%22%2C%20document.title%29%3B%0D%0A%20%20%20%20%7D%20else%20if%28navigator.clipboard%29%20%7B%0D%0A%20%20%20%20%20%20%20%20navigator.clipboard.writeText%28document.title%29%3B%0D%0A%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20prompt%28%22Select%20and%20copy%20the%20text.%22%2C%20document.title%29%3B%0D%0A%20%20%20%20%7D%0D%0A%7D%29%28%29%3B&name=Copy%20page%20title&optimize=uglifyjs)
   * [Delete style](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%3B%0D%0A%0D%0A%20%20%20%20Array.prototype.map.call%28d.querySelectorAll%28%22link%5Brel~%3D%27stylesheet%27%5D%2C%20style%22%29%2C%20function%28element%29%20%7B%0D%0A%20%20%20%20%20%20%20%20element.remove%28%29%3B%0D%0A%20%20%20%20%7D%29%3B%0D%0A%0D%0A%20%20%20%20Array.prototype.map.call%28d.querySelectorAll%28%22*%5Bstyle%5D%22%29%2C%20function%28element%29%20%7B%0D%0A%20%20%20%20%20%20%20%20element.removeAttribute%28%22style%22%29%3B%0D%0A%20%20%20%20%7D%29%3B%0D%0A%7D%29%28%29%3B&name=Delete%20style&optimize=uglifyjs)
   * [View password](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20Array.prototype.map.call%28document.querySelectorAll%28%22input%5Btype%3D%27password%27%5D%22%29%2C%20function%28input%29%20%7B%0D%0A%20%20%20%20%20%20%20%20input.type%20%3D%20%22text%22%3B%0D%0A%20%20%20%20%7D%29%3B%0D%0A%7D%29%28%29%3B&name=View%20password&optimize=uglifyjs)
 * リダイレクトのブックマークレット
   * [Go to home page](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20u%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement%20%3A%20l%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20u.protocol%20%2B%20%22%2F%2F%22%20%2B%20u.host%20%2B%20%22%2F%22%3B%0D%0A%7D%29%28%29%3B&name=Go%20to%20home%20page&optimize=uglifyjs)
   * [Go to parent page](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20u%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement%20%3A%20l%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20u.protocol%20%2B%20%22%2F%2F%22%20%2B%20u.host%20%2B%20u.pathname.replace%28%2F%5C%2F%2B%2Fg%2C%20%22%2F%22%29.replace%28%2F%5B%5E%5C%2F%5D%2B%5C%2F*%24%2F%2C%20%22%22%29%3B%0D%0A%7D%29%28%29%3B&name=Go%20to%20parent%20page&optimize=uglifyjs)
   * [Google Site Search](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20domain%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.hostname%29%20%3F%20d.activeElement.hostname%20%3A%20l.hostname%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dsite%253A%22%20%2B%20domain%20%2B%20%22%2520%22%3B%0D%0A%20%20%20%20var%20query%20%3D%20d.getSelection%28%29.toString%28%29%20%3F%20d.getSelection%28%29.toString%28%29%20%3A%20prompt%28%22Search%20within%20%22%20%2B%20domain%20%2B%20%22%20using%20Google.%22%2C%20%22%22%29%3B%0D%0A%0D%0A%20%20%20%20if%28query%20!%3D%3D%20null%29%20%7B%0D%0A%20%20%20%20%20%20%20%20l.href%20%3D%20url%20%2B%20query%3B%0D%0A%20%20%20%20%7D%0D%0A%7D%29%28%29%3B&name=Google%20Site%20Search&optimize=uglifyjs)
   * [Google Translate](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%2C%20nav%20%3D%20navigator%3B%0D%0A%20%20%20%20var%20lang%20%3D%20nav.language%20%7C%7C%20%28nav.languages%20%26%26%20nav.languages%5B0%5D%29%20%7C%7C%20nav.userLanguage%20%7C%7C%20nav.browserLanguage%20%7C%7C%20%22en%22%3B%0D%0A%20%20%20%20var%20select%20%3D%20d.getSelection%28%29.toString%28%29%3B%0D%0A%0D%0A%20%20%20%20if%28select%29%20%7B%0D%0A%20%20%20%20%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Ftranslate.google.com%2F%3Fsl%3Dauto%26tl%3D%22%20%2B%20lang%20%2B%20%22%26text%3D%22%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20l.href%20%3D%20url%20%2B%20encodeURIComponent%28select%29%3B%0D%0A%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Ftranslate.google.com%2Ftranslate%3Fsl%3Dauto%26tl%3D%22%20%2B%20lang%20%2B%20%22%26u%3D%22%3B%0D%0A%20%20%20%20%20%20%20%20var%20href%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement.href%20%3A%20l.href%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20l.href%20%3D%20url%20%2B%20encodeURIComponent%28href%29%3B%0D%0A%20%20%20%20%7D%0D%0A%7D%29%28%29%3B&name=Google%20Translate&optimize=uglifyjs)
   * [Internet Archive](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fweb.archive.org%2Fweb%2F*%2F%22%3B%0D%0A%20%20%20%20var%20href%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement.href%20%3A%20l.href%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20href%3B%0D%0A%7D%29%28%29%3B&name=Internet%20Archive&optimize=uglifyjs)
   * [Invidious](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fredirect.invidious.io%22%3B%0D%0A%20%20%20%20var%20u%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement%20%3A%20l%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20u.pathname%20%2B%20u.search%20%2B%20u.hash%3B%0D%0A%7D%29%28%29%3B&name=Invidious&optimize=uglifyjs)
   * [QR Code](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fchart.googleapis.com%2Fchart%3Fchs%3D480x480%26cht%3Dqr%26chl%3D%22%3B%0D%0A%20%20%20%20var%20href%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement.href%20%3A%20l.href%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20encodeURIComponent%28href%29%3B%0D%0A%7D%29%28%29%3B&name=QR%20Code&optimize=uglifyjs)
   * [The W3C CSS Validation Service](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fjigsaw.w3.org%2Fcss-validator%2Fvalidator%3Furi%3D%22%3B%0D%0A%20%20%20%20var%20href%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement.href%20%3A%20l.href%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20encodeURIComponent%28href%29%3B%0D%0A%7D%29%28%29%3B&name=The%20W3C%20CSS%20Validation%20Service&optimize=uglifyjs)
   * [The W3C Markup Validation Service](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fvalidator.w3.org%2Fcheck%3Furi%3D%22%3B%0D%0A%20%20%20%20var%20href%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement.href%20%3A%20l.href%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20encodeURIComponent%28href%29%3B%0D%0A%7D%29%28%29%3B&name=The%20W3C%20Markup%20Validation%20Service&optimize=uglifyjs)
   * [TinyURL](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Ftinyurl.com%2Fapi-create.php%3Furl%3D%22%3B%0D%0A%20%20%20%20var%20href%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.href%29%20%3F%20d.activeElement.href%20%3A%20l.href%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20encodeURIComponent%28href%29%3B%0D%0A%7D%29%28%29%3B&name=TinyURL&optimize=uglifyjs)
   * [Whois](https://purl.org/meta/bookmarklet-generator/#code=%28function%28%29%20%7B%0D%0A%20%20%20%20var%20d%20%3D%20document%2C%20l%20%3D%20location%3B%0D%0A%20%20%20%20var%20url%20%3D%20%22https%3A%2F%2Fwww.whois.com%2Fwhois%2F%22%3B%0D%0A%20%20%20%20var%20domain%20%3D%20%28d.activeElement%20%26%26%20d.activeElement.hostname%29%20%3F%20d.activeElement.hostname%20%3A%20l.hostname%3B%0D%0A%0D%0A%20%20%20%20l.href%20%3D%20url%20%2B%20domain%3B%0D%0A%7D%29%28%29%3B&name=Whois&optimize=uglifyjs)

# ライセンス

Bookmarklet Generator のライセンスは [LICENSE ファイル](LICENSE)に準じます。但し Bookmarklet Generator 内で使用したライブラリについてはライブラリ提供元のライセンスが適用されます。

 * [normalize.css](https://necolas.github.io/normalize.css/) - [ライセンス](licenses/normalize.css.md)
 * [jQuery](https://jquery.com/) - [ライセンス](licenses/jquery.txt)
 * [CodeMirror](https://codemirror.net/5/) - [ライセンス](licenses/codemirror.txt)
 * [UglifyJS](https://lisperator.net/uglifyjs/) - [ライセンス](licenses/uglify-js.txt)
 * [Openmoji](https://openmoji.org/) - [ライセンス](licenses/openmoji.txt)
