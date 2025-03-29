

$(function() {
	

});

function login_udb(targetUrl) {
	// 如果没登录，则弹出YY登陆框
	var host = 'http://' + domain_web;
	// var host = 'http://'+window.location.host;
	var url1 = host + '/udb/showlogin';

	var domain = null;
	if (document.domain != window.location.host
			&& (domain == undefined || domain == null)) {
		domain = document.domain;
	}

	var url2 = host
			+ '/udb/passlogin?callback=kk_udb_login_callback';
	if (domain != undefined && domain != null) {
		url2 = url2 + '&domain=' + domain;
	}
	url2 += '&sourceurl=' + encodeURIComponent(targetUrl);

	var url3 = host + '/udb/cancellogin';
	if (domain != undefined && domain != null) {
		url3 = url3 + '?domain=' + domain;
	}

	UDB.sdk.PCWeb.popupOpenLgn(url1, url2, url3);
}

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?94eff913c5b46aa068450df8c163a581";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

