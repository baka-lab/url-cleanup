// ==UserScript==
// @name UrlCleanup
// @description Убирает из URL в адресной строке UTM-метки и подсветку результатов поиска в Google (.com & .ru) (#:~:text=...)
// @author Baka
// @license GPL
// @version 0.2
// @include *
// ==/UserScript==

if (['www.google.com', 'www.google.ru'].includes(window.location.host)) {
	const MARKER = '#:~:text=';
	[...document.querySelectorAll('a')].forEach((link) => {
		if (link.href.includes(MARKER)) {
			const url = new URL(link.href);
			const parts = url.href.split(MARKER);
			link.href = parts[0];
		}
	});
}

const utms = [
	'utm_source',
	'utm_campaign',
	'utm_medium',
	'utm_content',
	'utm_referer',
	'utm_term'
];
var url = window.location.search;
utms.forEach(removeUTM);
var newUrl = window.location.origin + window.location.pathname + url;
if (newUrl != window.location.href) window.history.pushState(null, document.title, newUrl);

function removeUTM (utm) {
	url = url.split(utm)[0];
	if (url != '' && (url.endsWith('&') || url.endsWith('?'))) url = url.substr(0, url.length - 1);
}