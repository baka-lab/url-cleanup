// ==UserScript==
// @name UrlCleanup
// @description Убирает из URL в адресной строке UTM-метки
// @author Baka
// @license GPL
// @version 0.1
// @include *
// ==/UserScript==

const utms = [
	'utm_source',
	'utm_campaign',
	'utm_medium',
	'utm_content',
	'utm_term'
];
var url = window.location.search;
utms.forEach(removeUTM);
var newUrl = window.location.origin + window.location.pathname + url;
window.history.pushState(null, document.title, newUrl);

function removeUTM (utm) {
	url = url.split(utm)[0];
	if (url != '' && (url.endsWith('&') || url.endsWith('?'))) url = url.substr(0, url.length - 1);
}