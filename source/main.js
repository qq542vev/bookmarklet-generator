"use strict";

/**
 * @file 「Bookmarklet Generator」用のスクリプト
 * @author {@link https://purl.org/meta/me/|qq542vev}
 * @version 2023-03-13
 * @since 2023-03-13
 * @copyright Copyright (C) 2023-2023 qq542vev. Some rights reserved.
 * @license {@link https://creativecommons.org/licenses/by/4.0/|CC-BY}
 * @see {@link https://github.com/qq542vev/bookmarklet-generator|Project homepage}
 * @see {@link https://github.com/qq542vev/bookmarklet-generator/issues|Bug report}
 */

var $ = require("jquery");
var UglifyJS = require("uglify-js");
var CodeMirror = require("codemirror");
require("../node_modules/codemirror/mode/javascript/javascript");
require("../node_modules/codemirror/addon/edit/matchbrackets");
require("../node_modules/codemirror/addon/edit/closebrackets");
require("../node_modules/codemirror/addon/edit/trailingspace");
require("../node_modules/codemirror/addon/selection/active-line");

var jsEditor;
var applicationName = document.title;

/**
 * Persistent URL of service.
 *
 * @constant {string}
 * @see {@link https://purl.org/}
 */
var purl = "https://purl.org/meta/bookmarklet-generator/";

/**
 * URI path sub delimiters.
 *
 * @constant {Object.<string, string>}
 * @see {@link https://tools.ietf.org/html/rfc3986#section-3.3}
 */
var uriPathUnencodeCharacters = {
	exclamation_mark: "!",
	dollar_sign: "\\$",
	ampersand: "&",
	apostrophe: "'",
	left_parenthesis: "\\(",
	right_parenthesis: "\\)",
	asterisk: "\\*",
	plus_sign: "\\+",
	comma: ",",
	semicolon: ";",
	equals_sign: "=",
	colon: ":",
	commercial_at: "@",
	iri_characters:
		// \u{00A0}-\u{D7FF} | \u{F900}-\u{FDCF} | \u{FDF0}-\u{FFEF}
		"[\u00A0-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFEF]|" +
		// \u{10000}-\u{1FFFD}
		"[\uD800-\uD83E][\uDC00-\uDFFF]|\uD83F[\uDC00-\uDFFD]|" +
		// \u{20000}-\u{2FFFD}
		"[\uD840-\uD87E][\uDC00-\uDFFF]|\uD87F[\uDC00-\uDFFD]|" +
		// \u{30000}-\u{3FFFD}
		"[\uD880-\uD8BE][\uDC00-\uDFFF]|\uD8BF[\uDC00-\uDFFD]|" +
		// \u{40000}-\u{4FFFD}
		"[\uD8C0-\uD8FE][\uDC00-\uDFFF]|\uD8FF[\uDC00-\uDFFD]|" +
		// \u{50000}-\u{5FFFD}
		"[\uD900-\uD93E][\uDC00-\uDFFF]|\uD93F[\uDC00-\uDFFD]|" +
		// \u{60000}-\u{6FFFD}
		"[\uD940-\uD97E][\uDC00-\uDFFF]|\uD97F[\uDC00-\uDFFD]|" +
		// \u{70000}-\u{7FFFD}
		"[\uD980-\uD9BE][\uDC00-\uDFFF]|\uD9BF[\uDC00-\uDFFD]|" +
		// \u{80000}-\u{8FFFD}
		"[\uD9C0-\uD9FE][\uDC00-\uDFFF]|\uD9FF[\uDC00-\uDFFD]|" +
		// \u{90000}-\u{9FFFD}
		"[\uDA00-\uDA3E][\uDC00-\uDFFF]|\uDA3F[\uDC00-\uDFFD]|" +
		// \u{A0000}-\u{AFFFD}
		"[\uDA40-\uDA7E][\uDC00-\uDFFF]|\uDA7F[\uDC00-\uDFFD]|" +
		// \u{B0000}-\u{BFFFD}
		"[\uDA80-\uDABE][\uDC00-\uDFFF]|\uDABF[\uDC00-\uDFFD]|" +
		// \u{C0000}-\u{CFFFD}
		"[\uDAC0-\uDAFE][\uDC00-\uDFFF]|\uDAFF[\uDC00-\uDFFD]|" +
		// \u{D0000}-\u{DFFFD}
		"[\uDB00-\uDB3E][\uDC00-\uDFFF]|\uDB3F[\uDC00-\uDFFD]|" +
		// \u{E0000}-\u{EFFFD}
		"[\uDB40-\uDB7E][\uDC00-\uDFFF]|\uDB7F[\uDC00-\uDFFD]"
};

/**
 * Add bookmark.
 *
 * @param {string} url Bookmark URL
 * @param {string} title Bookmark title
 * @return {boolean}
 */
function addBookmark(url, title) {
	if(window.external && window.external.AddFavorite) {
		return window.external.AddFavorite(url, title);
	} else if(window.sidebar && window.sidebar.addPanel) {
		return window.sidebar.addPanel(title, url, "");
	}

	return false;
}

/**
 * Decode application/x-www-form-urlencoded.
 *
 * @param {string} str String
 * @return {string}
 * @see {@link https://url.spec.whatwg.org/#percent-decode}
 */
function decodeFormData(str) {
	return decodeURIComponent(str.replace(/\+/g, " "));
}

/**
 * Number Format.
 *
 * @param {number} number Number
 * @return {string}
 */
function numberFormat(number) {
	return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

/**
 * Parse application/x-www-form-urlencoded.
 *
 * @param {string} data URL encoded data
 * @return {Object.<string, string>}
 * @see {@link https://url.spec.whatwg.org/#urlencoded-parsing}
 */
function parseFormData(data) {
	var result = {};

	data.split("&").forEach(function(value) {
		var pair = value.split("=");

		result[decodeFormData(pair[0])] = pair[1] ? decodeFormData(pair[1]) : "";
	});

	return result;
}

/**
 * Output Bookmarklet URL.
 *
 * @param {string} jsCode Compressed JavaScript code
 */
function outputBookmarklet(jsCode) {
	var path = uriPercentEncode(jsCode, $("input:checkbox:checked[name^=unencode_][value=1]").map(function() {
		return uriPathUnencodeCharacters[this.name.replace(/^unencode_/, "")];
	}).get().join("|"));
	var uri = "javascript:" + path;
	var name = $("#name").val() || "Bookmarkret";
	var byteCount = numberFormat(utf8ByteCount(uri));
	var formData = $("#mainForm").serializeArray();
	document.title = name + " - " + applicationName;

	$("#status output").empty().append(
		$("<strong>").append(
			$("<a>", {
				"rel": "sidebar owl:sameAs",
				"href": uri,
				"title": name,
				"property": "dcterms:title",
				"text": name,
				"click": function() {
					addBookmark(this.href, $(this).text());

					return false;
				}
			})
		),
		" - ",
		$("<span>", {
			"property": "schema:fileSize",
			"text": byteCount + " Bytes"
		})
	);
	$("#messages .message").remove();

	$("link[rel=sidebar]").attr({
		"href": uri,
		"title": name
	});
	var delimiter = RegExp("(" + $.map(uriPathUnencodeCharacters, String).join("|") + "|%[\\dA-Fa-f]{2})");
	var subDelimiter = RegExp($.map(uriPathUnencodeCharacters, function(value, key) {
		return key === "iri_characters" ? null : value;
	}).join("|"));
	var iriCharacter = RegExp(uriPathUnencodeCharacters.iri_characters)
	var percentEncoded = /%[\dA-Fa-f]{2}/;

	$("#bookmarkletURI").attr("title", jsCode).find(".path").empty().append(
		$.map(path.split(delimiter), function(value) {
			if(subDelimiter.test(value)) {
				return $("<span class='sub-delimiter'>").text(value);
			} else if(iriCharacter.test(value)) {
				return $("<span class='iri-character'>").text(value);
			} else if(percentEncoded.test(value)) {
				return $("<span class='percent-encoded'>").text(value);
			}

			return value;
		})
	);

	$("#normalHtmlCode output").text(
		$("<div>").append($("<a>", {
			"href": uri,
			"text": name
		})).html()
	);

	$("#extendedHtmlCode output").text(
		$("<div>").append($("<a>", {
			"rel": "sidebar",
			"href": uri,
			"text": name,
			"onclick": "(function(t,w){var e=w.external,s=w.sidebar;if(e&&e.AddFavorite){e.AddFavorite(t.href,t.title);}else if(s&&s.addPanel){s.addPanel(t.title,t.href,'');};return false;})(this,window);"
		})).html()
	);
}

/**
 * Output Messages.
 *
 * @param {string} status Status message
 * @param {Array.<string>} messages Warning messages
 */

function outputMessage(status, messages) {
	var messages = (messages instanceof Array) ? messages : [messages];
	var section = $("#messages");

	section.children(".message").remove();
	$("#status output").empty().append(status);

	$.each(messages, function(key, value) {
		$("<samp>").appendTo($("<pre class='message'>").appendTo(section)).append(value);
	});
}

/**
 * URI percent encode.
 *
 * @param {string} str String
 * @param {string} unencodeChar Unencoded characters of regular expression pattern
 * @return {string}
 * @see {@link https://tools.ietf.org/html/rfc3986#section-2.1}
 */
function uriPercentEncode(str, unencodeChar) {
	var reg = RegExp(unencodeChar ? "(" + (unencodeChar) + ")" : "^$");

	return $.map(str.split(reg), function(value) {
		return reg.test(value) ? value : encodeURIComponent(value).replace(/[!'()*]/g, function(match) {
			return "%" + match.charCodeAt(0).toString(16);
		});
	}).join("");
}

/**
 * Get UTF-8 byte count.
 *
 * @param {string} str - String
 * @return {number}
 * @see {@link https://www.softel.co.jp/blogs/tech/archives/3318}
 */
function utf8ByteCount(str) {
	return encodeURI(str).replace(/%[\dA-Fa-f]{2}/g, "*").length;
}

/**
 * Page rewrite.
 */
function pageRewrite() {
	var jsCode = jsEditor.doc.getValue();
	var optimize = $("#optimize").val();
	location.hash = "#" + $("#mainForm").serialize();

	if(optimize === "no") {
		outputBookmarklet($.trim(jsCode));
	} else if(optimize === "uglifyjs") {
		try {
			outputBookmarklet(UglifyJS.minify(jsCode, {
				"warnings": true,
				"fromString": true
			}).code);
		} catch(error) {
			outputMessage(
				error.name,
				$.map({"line": "Line", "col": "Col", "pos": "Position"}, function(value, key) {
					return value + ": " + error[key]
				}).join(", ") + "\n" + error.message
			);
		}
	}
}

$(function() {
	var query = parseFormData(location.hash.substring(1));

	$("#code").val(query.code || "(function() {\n\n})();");
	$("#name").val(query.name);
	$("#optimize option[value]").each(function(index, element) {
		if(this.value === query.optimize) {
			$("#optimize").val(query.optimize);
		}
	});

	$.each(query, function(key, value) {
		if(!key.indexOf("unencode_") && value === "1") {
			$("#" + key).prop("checked", true);
		}
	});

	jsEditor = CodeMirror.fromTextArea($("#code")[0], {
		mode: "javascript",
		lineNumbers: true,
		indentUnit: 4,
		showCursorWhenSelecting: true,
		autofocus: true,
		cursorScrollMargin: 2,
		matchBrackets: true,
		autoCloseBrackets: true,
		showTrailingSpace: {highlightNonMatching: false},
		styleActiveLine: true
	});
	jsEditor.on("blur", function(CodeMirror) {
		CodeMirror.save();

		pageRewrite();
	});

	$("#name, #optimize, #mainForm :checkbox").change(pageRewrite);
	$("#mainForm").submit(false);

	$("#run").click(function() {
		$.globalEval(jsEditor.doc.getValue());
	});
	$("#purl").click(function() {
		var url = purl + "#" + $("#mainForm").serialize();

		prompt(
			"Persistent URL of current input status.\nGo to Persistent URL?",
			url
		) && (location.href = url);
	});
	$("#clear").click(function() {
		if(confirm("Do you want to reset the contents of the form?")) {
			$("#mainForm").trigger("reset");
			jsEditor.doc.setValue("(function() {\n\n})();");
			jsEditor.save();

			pageRewrite();
		}
	});
	$("#toggle").click(function() {
		var checkbox = $("#unencode_characters input:checkbox");

		checkbox.prop("checked", $("#unencode_characters input:checked").length <= (checkbox.length / 2));

		pageRewrite();
	});
	$("#output pre").dblclick(function() {
		window.getSelection().selectAllChildren(this);
	});

	pageRewrite();
});
