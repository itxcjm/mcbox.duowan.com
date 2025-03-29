var groundhog = groundhog || {};

groundhog.config = {
	articleType : {
		"评测" : 1,
		"资讯" : 2,
		"攻略" : 3,
		"视频" : 4
	},

	articleContentType : {
		"原创" : 1,
		"转载" : 2
	},

	statType : {
		pv : 1,
		light : 2,
		dl : 3,
		down : 4,
		store : 5
	},

	objectType : {
		game : 1,
		article : 2,
		article_group : 3,
		game_group : 4,
		tag : 5,
		h5game : 8,
		mcRes:100,
		mc_act_work:111
	},

	platformType : {
		android : 1,
		ios : 2,
		wp : 3,
		all : 100,
		pc:4
	},

	adminUrl : "http://admin." + domain_duowan,

	// webUrl : "http://test.lua.com"
	webUrl : "http://" + domain_web

};

// ======================= 统计模块  ==============================

groundhog.stat = groundhog.stat || {};

/*
 * require kk.js
 */
groundhog.stat.recordOnce = function(st, ot, pt, oid, callback) {
	if (!oid) {
		return false;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}

	// avoid
	var cookieName = "groundhog_stat_" + st + "_" + ot + "_" + pt + "_" + oid;
	var cookieValue = kk.browser.getCookie(cookieName);

	// 赞、踩、收藏
	if (st == 2 || st == 4) {
		if (cookieValue) {
			return false;
		}
	}

	var data = {
		"st" : st,
		"ot" : ot,
		"pt" : pt,
		"oid" : oid,
		"t" : (new Date().getTime())
	};

	var url = groundhog.config.webUrl + "/stat";

	$.get(url, data, function() {
		return true;
	}, 'json');

	if (st == 2 || st == 4) {
		// set cookie
		kk.browser.setCookie(cookieName, "1", 1);
	}

	if (callback && typeof (callback) == 'function') {
		callback();
	}

	return true;
};

groundhog.stat.recordOnceCd = function(st, ot, pt, oid) {
	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}

	var data = {
		"st" : st,
		"ot" : ot,
		"pt" : pt,
		"oid" : oid
	};

	var url = groundhog.config.webUrl + "/stat";

	$.get(url, data, function(data) {
		return true;
	}, "jsonp");
};

/**
 * 查询 total
 */
groundhog.stat.queryTotal = function(st, ot, pt, oid, recal, handler) {
	if (!oid)
		return;

	isNaN(st) ? (st = groundhog.config.statType[st]) : null;
	isNaN(ot) ? (ot = groundhog.config.objectType[ot]) : null;
	isNaN(pt) ? (pt = groundhog.config.platformType[pt]) : null;
	(recal === undefined) ? (recal = false) : null;

	var data = {
		"st" : st,
		"ot" : ot,
		"pt" : pt,
		"oid" : oid,
		"recal" : recal,
		"t" : (new Date().getTime())
	};

	var url = groundhog.config.webUrl + "/stat/query/total";

	$.get(url, data, function(rtnObj) {
		// console.log("rtnObj",JSON.stringify(rtnObj));
		var rs = rtnObj.data.result;
		if (rs == "success") {
			var total = rtnObj.data.total;

			if (handler && $.isFunction(handler)) {
				handler(total);
			}
		}

		return true;
	}, "json");

	// for test
	// handler(5);

};

groundhog.stat.checkCookie = function(st, ot, pt, oid, callback) {
	if (!oid) {
		return;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}

	var cookieName = "groundhog_stat_" + st + "_" + ot + "_" + pt + "_" + oid;
	var cookieValue = kk.browser.getCookie(cookieName);

	if (cookieValue) {
		if (callback && typeof (callback) == 'function') {
			callback();
		}
	}

};

groundhog.stat.clearCookie = function(st, ot, pt, oid) {
	if (!oid) {
		return;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}
	var cookieName = "groundhog_stat_" + st + "_" + ot + "_" + pt + "_" + oid;
	kk.browser.setCookie(cookieName, "1", -1);
}

groundhog.stat.getCookieValue = function(st, ot, pt, oid) {
	if (!oid) {
		return;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}
	var cookieName = "groundhog_stat_" + st + "_" + ot + "_" + pt + "_" + oid;
	var cookieValue = kk.browser.getCookie(cookieName);
	return cookieValue;
}

groundhog.stat.clearCookieValue = function(st, ot, pt, oid) {
	if (!oid) {
		return;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}
	var cookieName = "groundhog_stat_" + st + "_" + ot + "_" + pt + "_" + oid;
	var cookieValue = kk.browser.setCookie(cookieName);
	return cookieValue;
}

groundhog.stat.checkUserStore = function(ot, pt, oid, sot, callback) {
	if (!ot || !pt || !oid) {
		return;
	}
	if (!sot) {
		sot = 0;
	}
	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}

	var url = groundhog.config.webUrl + "/user/store/checkUserStore_json";
	var data = {
		"ot" : ot,
		"pt" : pt,
		"oid" : oid,
		"sot" : sot,
		"t" : (new Date().getTime())
	};

	$.get(url, data, function(data) {
		var data = eval("(" + data + ")");
		if (data.status == 3) {
			if (callback && typeof (callback) == 'function') {
				callback();
			}
		}
	});

}

groundhog.stat.update = function(inputNamePrefix, st, ot, pt, oid) {
	if (!oid) {
		return;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}

	dayCount = $("input[name='" + inputNamePrefix + ".dayCount']").val();
	if (!dayCount || isNaN(dayCount)) {
		dayCount = 0;
	}

	var data = {
		"st" : st,
		"ot" : ot,
		"pt" : pt,
		"oid" : oid,
		"dayCount" : dayCount
	};

	var url = groundhog.config.adminUrl + "/stat/update";

	$.get(url, data, function(rtnObj) {
		// console.log("rtnObj",JSON.stringify(rtnObj));
		var rs = rtnObj.data.result;
		if (rs == "success") {
			$("input[name='" + inputNamePrefix + ".weekCount']").val(
					rtnObj.data.stat.weekCount);
			$("input[name='" + inputNamePrefix + ".totalCount']").val(
					rtnObj.data.stat.totalCount);
		} else {
			alert("修改失败！");
		}
		return true;
	}, "json");
};

/**
 * 加载统计数据
 * 
 * @param {Object}
 *            inputNamePrefix
 * @param {Object}
 *            st statType
 * @param {Object}
 *            ot objectType
 * @param {Object}
 *            pt platformType
 * @param {Object}
 *            oid objectId
 */
groundhog.stat.load = function(inputNamePrefix, st, ot, pt, oid) {
	if (!oid) {
		return;
	}

	if (isNaN(st)) {
		st = groundhog.config.statType[st];
	}

	if (isNaN(ot)) {
		ot = groundhog.config.objectType[ot];
	}

	if (isNaN(pt)) {
		pt = groundhog.config.platformType[pt];
	}

	dayCount = $("input[name='" + inputNamePrefix + ".dayCount']").val();
	if (!dayCount || isNaN(dayCount)) {
		dayCount = 0;
	}

	var data = {
		"st" : st,
		"ot" : ot,
		"pt" : pt,
		"oid" : oid
	};

	var url = groundhog.config.adminUrl + "/stat/query";

	$.get(url, data, function(rtnObj) {
		// console.log("rtnObj",JSON.stringify(rtnObj));
		var rs = rtnObj.data.result;
		if (rs == "success") {
			$("input[name='" + inputNamePrefix + ".dayCount']").val(
					rtnObj.data.stat.dayCount);
			$("input[name='" + inputNamePrefix + ".weekCount']").val(
					rtnObj.data.stat.weekCount);
			$("input[name='" + inputNamePrefix + ".totalCount']").val(
					rtnObj.data.stat.totalCount);
		} else {

		}
		return true;
	}, "json");
};

groundhog.stat.trackEvent = function(category, action, opt_label, opt_value) {
	try {
		if (!opt_value) {
			opt_value = null;
		}

		// baidu statistic
		if (window['_hmt'] != null && _hmt != undefined && _hmt) {
			_hmt
					.push([ '_trackEvent', category, action, opt_label,
							opt_value ]);
		}

		// google statistic
		if (window['ga'] != null && ga != undefined && ga) {
			ga('send', 'event', category, action, opt_label, opt_value);
		}

	} catch (e) {

	}
	return true;
};

groundhog.stat.recordSearchKey = function(key, opt_isGame, opt_isArticle) {
	try {
		if (key == null) {
			return;
		}
		var data = {
			"key" : key,
			"isGame" : opt_isGame,
			"isArticle" : opt_isArticle
		};

		var url = groundhog.config.webUrl + "/record/search_key";

		$.get(url, data, function(e) {
			return true;
		}, "json");

	} catch (e) {

	}
	return true;
};

// ======================= util 模块 ==============================
groundhog.util = groundhog.util || {};

groundhog.util.getCursortPosition = function(ctrl) {
	var CaretPos = 0;
	// IE Support
	if (document.selection) {
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
};

groundhog.util.setCaretPosition = function(ctrl, pos) {
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};

/**
 * 格式化数量
 */
groundhog.util.formatTotalCount = function(totalCount, scale) {
	if (typeof (totalCount) != 'number') {
		return totalCount;
	}
	var defaultScale = 1;
	var result = totalCount;
	if (scale) {
		defaultScale = scale;
	}
	if (totalCount >= 100000000) {
		var value = totalCount / 100000000;
		var pow = Math.pow(10, defaultScale);
		var res = Math.round(value * pow) / pow;
		result = res + '亿';
	} else if (totalCount >= 10000) {
		var value = totalCount / 10000;
		var pow = Math.pow(10, defaultScale);
		var res = Math.round(value * pow) / pow;
		result = res + '万';
	}
	return result;
};

/**
 * 判断是否ie 6.
 */
groundhog.util.isIESix = function() {
	return /MSIE 6.0/.test(navigator.userAgent);
};

/**
 * 判断是否ie .
 */
groundhog.util.isIE = function() {
	return /MSIE/.test(navigator.userAgent);
};
/**
 * 获取字符串真实长度.
 */
groundhog.util.len_chinese = function(s) {
	var l = 0;
	var a = s.split("");
	for (var i = 0; i < a.length; i++) {
		if (/[\u4e00-\u9fa5]/.test(a[i])) {
			l += 2;
		} else {
			l++;
		}
	}
	return l;
};
/**
 * 根据字符串真是长度截取字符串.
 */
groundhog.util.cut_str = function(s, length) {
	var l = 0;
	var a = s.split("");
	var index = 0;
	for (var i = 0; i < length; i++) {
		if (/[\u4e00-\u9fa5]/.test(a[i])) {
			i = i + 1;
		}
		index = index + 1;
	}
	var sub_str = s.substr(0, index);
	return sub_str;
};

groundhog.util.namespace = {};
/**
 * 注册js package的方法.
 */
groundhog.util.namespace.register = function() {
	if (typeof (ns) != "string")
		return;
	ns = ns.split(".");
	var o, ni;
	for (var i = 0, len = ns.length; i < len, ni = ns[i]; i++) {
		try {
			o = (o ? (o[ni] = o[ni] || {}) : (eval(ni + "=" + ni + "||{}")))
		} catch (e) {
			o = eval(ni + "={}")
		}
	}
};
// 写cookie 有效期一天
groundhog.util.setCookie = function(sName, sValue, cusExpires) {
	var date = null;
	if (cusExpires instanceof Date) {
		// 自定义失效时间
		date = cusExpires;
	} else {
		// 默认一天失效
		date = new Date();
		date.setDate(date.getDate() + 1);
	}
	document.cookie = sName + "=" + escape(sValue) + "; expires="
			+ date.toGMTString() + ';domain=' + domain_res + ';path=/';
}
// 读取cookie
groundhog.util.getCookie = function(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	return null;
}
// 删除cookie
groundhog.util.delCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = groundhog.util.getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
				+ ';domain=' + domain_res + ';path=/';
		;
	}
}
/**
 * 提示框公用方法。
 */
groundhog.util.artDialogTips = function(content, time, islock, init, close, style) {
	var hasCancel = false;
	var hasLock = true;
	var s = style || "";
	if (time && time > 25) {
		hasCancel = true;
	}
	if (islock == false) {
		hasLock = false;
	}

	return art.dialog({
		init : init,
		close : close,
		id : 'Tips',
		width : '300px',
		title : false,
		cancel : hasCancel,
		fixed : true,
		lock : hasLock
	}).content('<div style="padding: 0 1em;' + s + '">' + content + '</div>').time(
			time || 1.5);
};
// ======================= 全站的通用函数 ==============================

groundhog.page = groundhog.page || {};

groundhog.page.config = {
	index_searchFocusText : "搜索一下,更多精彩",
	index_searchBlurText : "输入您想要的游戏..."
};
