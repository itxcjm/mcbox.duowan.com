var kk = kk || {};


//=======================================

kk.browser = kk.browser || {};

kk.browser.goto = function(url){
	window.location.href = url;
};

kk.browser.open = function(url){
	window.open(url);
};

kk.browser.confirm = function(tips,url){
	if(confirm(tips)){
		kk.browser.goto(url);
	}
};


kk.browser.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate( eval(exdate.getDate() + expiredays));
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};



kk.browser.getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
};

kk.browser.getDomain = function(){
	var domain = document.domain;
	
	if(!domain){
		domain = window.location.host;
	}
	
	return domain;
};

kk.browser.getPort = function(){
	var port = window.location.port;
	
	return port;
};

kk.browser.getProtocol = function(){
	var protocol = window.location.protocol;
	
	return protocol;
};

kk.browser.parseUrl = function(url){
	var a =  document.createElement('a');  
    a.href = url;  
    return {  
        source: url,  
        protocol: a.protocol.replace(':',''),  
        host: a.hostname,  
        port: a.port,  
        query: a.search,  
        params: (function(){  
            var ret = {},  
                seg = a.search.replace(/^\?/,'').split('&'),  
                len = seg.length, i = 0, s;  
            for (;i<len;i++) {  
                if (!seg[i]) { continue; }  
                s = seg[i].split('=');  
                ret[s[0]] = s[1];  
            }  
            return ret;  
        })(),  
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],  
        hash: a.hash.replace('#',''),  
        path: a.pathname.replace(/^([^\/])/,'/$1'),  
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],  
        segments: a.pathname.replace(/^\//,'').split('/')  
    }; 
};

//=======================================

kk.log = kk.log || {};

kk.log.info = function(msg){
	if(console && console.log){
		console.log(msg);
	}	
};

//=======================================

kk.client = kk.client || {};

kk.client.open = function(url,title,key){
	try {
		return window.external.KK_addIETab2(url, title, key, false, true); 
	} catch (e) {
		window.open(url);
	}
};

//=======================================


kk.util = kk.util || {};

kk.util.checkImgType = function(filename){
	var pos = filename.lastIndexOf(".");  
    var str = filename.substring(pos, filename.length);  
    var str1 = str.toLowerCase();  
    if (!/\.(gif|jpg|jpeg|png|bmp)$/.test(str1)) {  
        return false;  
    }  
    return true; 	
};

kk.util.currentDate = function(){
	var nowDate = new Date();
	var str = nowDate.getFullYear()+"年"+(nowDate.getMonth() + 1)+"月"+nowDate.getDate()+"日";
    return str; 	
};

kk.util.currentTime = function(){
	var nowDate = new Date();
	var str = nowDate.getHours()+":"+nowDate.getMinutes();
    return str; 	
};

kk.util.clone = function(obj){
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        var len = obj.length;
        for (var i = 0; i < len; ++i) {
            copy[i] = kk.util.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = kk.util.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");	
	
};


kk.util.getCursortPosition = function(ctrl) {
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

kk.util.setCaretPosition = function(ctrl, pos){
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};

kk.util.getStringLength = function(str){
	var n=0; 
	for(var i=0; i<s.length; i++){
		if(s.charCodeAt(i)<128){
			n++;
		}else{
			n+=2;
		}
	}
	
	return n;	
};
//=======================================

kk.number = kk.number || {};

/*
alert(formatNumber(0,''));
alert(formatNumber(12432.21,'#,###'));
alert(formatNumber(12432.21,'#,###.000#'));
alert(formatNumber(12432,'#,###.00'));
alert(formatNumber('12432.415','#,###.0#')); 
 */
kk.number.formatNumber = function(number,pattern){
    var str            = number.toString();
    var strInt;
    var strFloat;
    var formatInt;
    var formatFloat;
    if(/\./g.test(pattern)){
        formatInt        = pattern.split('.')[0];
        formatFloat        = pattern.split('.')[1];
    }else{
        formatInt        = pattern;
        formatFloat        = null;
    }

    if(/\./g.test(str)){
        if(formatFloat!=null){
            var tempFloat    = Math.round(parseFloat('0.'+str.split('.')[1])*Math.pow(10,formatFloat.length))/Math.pow(10,formatFloat.length);
            strInt        = (Math.floor(number)+Math.floor(tempFloat)).toString();                
            strFloat    = /\./g.test(tempFloat.toString())?tempFloat.toString().split('.')[1]:'0';            
        }else{
            strInt        = Math.round(number).toString();
            strFloat    = '0';
        }
    }else{
        strInt        = str;
        strFloat    = '0';
    }
    if(formatInt!=null){
        var outputInt    = '';
        var zero        = formatInt.match(/0*$/)[0].length;
        var comma        = null;
        if(/,/g.test(formatInt)){
            comma        = formatInt.match(/,[^,]*/)[0].length-1;
        }
        var newReg        = new RegExp('(\\d{'+comma+'})','g');

        if(strInt.length<zero){
            outputInt        = new Array(zero+1).join('0')+strInt;
            outputInt        = outputInt.substr(outputInt.length-zero,zero);
        }else{
            outputInt        = strInt;
        }

        var 
        outputInt            = outputInt.substr(0,outputInt.length%comma)+outputInt.substring(outputInt.length%comma).replace(newReg,(comma!=null?',':'')+'$1');
        outputInt            = outputInt.replace(/^,/,'');

        strInt    = outputInt;
    }

    if(formatFloat!=null){
        var outputFloat    = '';
        var zero        = formatFloat.match(/^0*/)[0].length;

        if(strFloat.length<zero){
            outputFloat        = strFloat+new Array(zero+1).join('0');
            //outputFloat        = outputFloat.substring(0,formatFloat.length);
            var outputFloat1    = outputFloat.substring(0,zero);
            var outputFloat2    = outputFloat.substring(zero,formatFloat.length);
            outputFloat        = outputFloat1+outputFloat2.replace(/0*$/,'');
        }else{
            outputFloat        = strFloat.substring(0,formatFloat.length);
        }

        strFloat    = outputFloat;
    }else{
        if(pattern!='' || (pattern=='' && strFloat=='0')){
            strFloat    = '';
        }
    }

    return strInt+(strFloat==''?'':'.'+strFloat);
};

//=======================================

// depends on mustache.js
// https://github.com/janl/mustache.js
kk.tmpl = kk.tmpl || {}; 

kk.tmpl.render = function(tmpl, data){
	return Mustache.render(tmpl, data);
};







//=======================================

kk.xml = kk.xml || {};

kk.xml.loadFile = function(xmlFile) {
	var xmlDoc;

	if (window.ActiveXObject) {
		xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
		xmlDoc.async = false;
		xmlDoc.load(xmlFile);
	} else if (document.implementation && document.implementation.createDocument) {
		xmlDoc = document.implementation.createDocument('', '', null);
		xmlDoc.load(xmlFile);
	} else {
		return null;
	}

	return xmlDoc;
};

//=======================================

Date.prototype.format = function(format) {
	/*
	 * eg:format="YYYY-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
		"S" : this.getMilliseconds() //millisecond
	};

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

//=======================================
// jquery extention
jQuery["postJSON"] = function( url, data, callback ) {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ) ) {
        callback = data;
        data = undefined;
    }

    return jQuery.ajax({
        url: url,
        type: "POST",
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: callback
    });
};