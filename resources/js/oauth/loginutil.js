;
(function() {
	try {
		// 第三方依赖.
		if (!window.$LAB) {
			$('head')
					.append(
							$("<script src='/resources/js/lib/LAB.min.js' type='text/javascript'></script>"));
		}
		// 命名空间方法.主要使用与专区注册方法.
		var namespace = function() {
		};
		namespace.register = function(ns) {
			if (typeof (ns) != "string")
				return;
			ns = ns.split(".");
			var o, ni;
			for ( var i = 0, len = ns.length; i < len, ni = ns[i]; i++) {
				try {
					o = (o ? (o[ni] = o[ni] || {}) : (eval(ni + "=" + ni
							+ "||{}")))
				} catch (e) {
					o = eval(ni + "={}")
				}
			}
		};
		if (window.groundhog == null) {
			namespace.register("groundhog");
		}
		if (groundhog.page == null) {
			namespace.register("groundhog.page");
		}
		var loginutil = groundhog.page.loginutil = {};
		/**
		 * 获取土拨鼠网站登陆状态方法,传入
		 * 异步调用的callback,回调首参数state解释:1-有土拨鼠用户信息,2-畅言游客登陆,3-无登陆信息. data-更多登陆信息.
		 */
		loginutil.getLoginState = function(callback) {
			// 读取登陆状态
			$.getJSON("http://" + domain_web + "/oauth/userinfois?jsoncallback=?",
					{
						timeStamp : new Date().getTime()
					}, function(data) {
						if (data.result) {
							var user = data.user;
							if (user != null) {
								// 有土拨鼠用户信息
								callback.call(this, 1, data);
							} else {
								// 畅言游客登陆
								callback.call(this, 2, data);
							}
						} else {
							// 无登陆信息.
							callback.call(this, 0, data);
						}
					});
		};
		/**
		 * 退出土拨鼠登陆的方法,传入callback异步回调函数。 参数data是退出登陆详细信息,包括退出uc登陆的script数组.
		 */
		loginutil.logoutGroundhog = function(callback) {
			$.getJSON("http://" + domain_web + "/oauth/logout?jsoncallback=?", {
				timeStamp : new Date().getTime()
			}, function(data) {
				if (data.result) {
					logoutCY();
					var _that = this;
					renderUCScript(data.script, function() {
						callback.call(_that, data);
					});
				}
			});
		};
		/**
		 * 登陆按钮点击事件注册. 请传入qq,weibo,yy按钮的jQuery选择器.
		 */
		loginutil.regLoginBtn = function(qq, weibo, yy) {
			var _location = window.location;
			$(qq)
					.click(
							function() {
								_location.href = 'http://' + domain_web + '/oauth/qq?sourceurl='
										+ encodeURIComponent(_location.href);
								return false;
							});
			$(weibo)
					.click(
							function() {
								_location.href = 'http://' + domain_web + '/oauth/weibo?sourceurl='
										+ encodeURIComponent(_location.href);
								return false;
							});
			$(yy)
					.click(
							function() {
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

								var url3 = host + '/udb/cancellogin';
								if (domain != undefined && domain != null) {
									url3 = url3 + '?domain=' + domain;
								}

								UDB.sdk.PCWeb.popupOpenLgn(url1, url2, url3);
							});
		};
	} catch (e) {
		console.error(e);
	}
})();