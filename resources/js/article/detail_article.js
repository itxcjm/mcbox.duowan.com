$(document).ready(function(){
	if ($(".dwlBanner").length > 0) {
		$("body").css("padding-top",$(".dwlBanner")[0].offsetHeight);
	}
	var articleId = $("#articleId").val();
	// load pv count
	/*
	groundhog.stat.queryTotal('pv', 'article', 'all', articleId, false,
			function(total) {
				// alert(total);
				$("#articleViewCount").html(groundhog.util.formatTotalCount(total));
			});
			*/
	$("#articleViewCount").html(groundhog.util.formatTotalCount(parseInt($("#articleViewCount").html())));
	// 发送统计请求
	// pv stat
	groundhog.stat.recordOnce('pv', 'article', 'all', articleId);
	//图片延迟加载
	$('img.scroll_loading_images').scrollLoading();
	
	//根据app版本判断显示下载按钮
	var appVersion = null;
	if(window.mctools && window.mctools.getAppVersionInfo){
		// {"versionName":"1.3.21-SNAPSHOT","versionCode":"125","appCookies":}}
		// 处理掉APP传递异常的值
		try {
			var jsonObj = JSON.parse(window.mctools.getAppVersionInfo());
			appVersion = parseInt(jsonObj.versionCode, 10);
		} catch(e) {
			appVersion = 92;
		}
	}
	
	if(appVersion && appVersion > 91){
		$(".videobox .dwl").show();
		window.mctools.buttonReady();
	}
})


function isNewVersion(){
	var appVersion = null;
	if(window.mctools && window.mctools.getAppVersionInfo){
		try {
			var jsonObj = JSON.parse(window.mctools.getAppVersionInfo());
			appVersion = parseInt(jsonObj.versionCode, 10);
		} catch(e) {
			appVersion = 92;
		}
	}
	
	if(appVersion && appVersion > 125){
		return true;
	}
	
	return false;
}

function getVersion(){
	var appVersion = null;
	if(window.mctools && window.mctools.getAppVersionInfo){
		try {
			var jsonObj = JSON.parse(window.mctools.getAppVersionInfo());
			appVersion = parseInt(jsonObj.versionCode, 10);
		} catch(e) {
			appVersion = 92;
		}
	}
	return appVersion;
	
}


function isDownloadBtn(infoStr){
	if(infoStr.indexOf("'type':'download'") > -1){
		return true;
	}
	return false;
}

function isDownloadStatus(infoStr){
	var span = $(".videobox .dwl").find('span');
	if(span){
		var text = span.text();
		if(text){
			if(text.indexOf("下载(")>-1){
				return true;
			}
		}
	}
	return false;
}

function clickObj(infoStr) {
	if(isDownloadBtn(infoStr) && isDownloadStatus(infoStr) &&isNewVersion()){
		// 只有下载视频的时候，才判断版本号是否是1.6.4的versionCode
		changeToLoading();
	}
	window.mctools.clickContent(infoStr);
}

function jumpInApp(url, articleId, coverImage) {
	window.mctools.innerJump(url, articleId, coverImage);
}

function changeToLoading(){
	if($(".videobox .dwl").find('span')[0]){
		$($(".videobox .dwl").find('span')[0]).text("下载中");
	}
}

function downloadInfo(dlStr){
	var dl = JSON.parse(dlStr);
	if(dl){
		initDwl(dl.dlInfo.definition, dl.dlSetting.definition);
	}
}

function initDwl(dlInfo, dlSetting){
	
	
	if(dlInfo) {
		$(".videobox .dwl").find('span').text("已下载");
		
		if($(".videobox .dwl").find('span')[1]){
			$(".videobox .dwl").find('span')[1].remove();
		}
		
		if("yuanhua" == dlInfo){
			$(".videobox .dwl").append("<span class='zt-icon yuan'> </span>");
		}else if("1300" == dlInfo){
			$(".videobox .dwl").append("<span class='zt-icon gao'> </span>");
		}else if("1000" == dlInfo){
			$(".videobox .dwl").append("<span class='zt-icon biao'> </span>");
		}else if("350" == dlInfo){
			$(".videobox .dwl").append("<span class='zt-icon chang'> </span>");
		}
		
		$(".videobox .dwl").addClass("dwled");
		$(".videobox .dwl").find('span').addClass("newspan")
		 
		if($(".videobox .defineMsg").find('font')){
			$(".videobox .defineMsg").find('font').remove();
		}
		$(".videobox .defineMsg").append("<font size=2.4 color='#d3b58e'>"+getDlMsg(dlSetting)+"<font>");
		//$(".videobox .dwl").attr("onclick","");
		//$(".videobox .dwl").attr("onclick","window.mctools.clickHasDownload();");
		extFunc();
	} else {
		var onclickStr = $(".videobox .dwl").attr("onclick");
		var startCount = onclickStr.indexOf("'items':");
		var endCount = onclickStr.length-3;
		if(-1 != startCount && (endCount > startCount)){
			var itemsStr = "{" + onclickStr.substring(startCount,endCount) + "}"; 
			var items = JSON.parse(itemsStr.replace(/'/g,"\""));
			var itemsList = items.items;
			if(itemsList && itemsList.length > 0){
				var definitionUrlMap = {};
				var definitionSizeMap = {};
				for(var i = 0; i<itemsList.length; i++){
					var item = itemsList[i];
					var key = item.definition;
					var urlValue = item.urls;
					var sizeValue = item.size;
					if(key){
						definitionUrlMap[key] = urlValue;
						definitionSizeMap[key] = sizeValue;
					}
				}
				
				if(dlSetting && definitionUrlMap[dlSetting] && definitionUrlMap[dlSetting][0]){
					//onclickStr = onclickStr.replace("_CURDEFINITION_", dlSetting);
					onclickStr = replaceCurDefinition(onclickStr,dlSetting);
					onclickStr = replaceFileSize(onclickStr, definitionSizeMap[dlSetting]);
					onclickStr = replaceUrl(onclickStr, definitionUrlMap[dlSetting][0]);
					$(".videobox .dwl").attr("onclick",onclickStr);
					initBtnStyle(dlSetting,definitionSizeMap[dlSetting]);
				} else {
					setParam(definitionUrlMap, definitionSizeMap,dlSetting, 0, onclickStr);
				}
				$(".videobox .defineMsg").append("<font size=2.4 color='#d3b58e'>"+getDlMsg(dlSetting)+"<font>");
			} else {
//				alert("暂时没有下载地址");
			}
		} else {
//			alert("暂时没有下载地址");
		}
	}
}

function extFunc(){
	//为将来扩展业务留的方法
} 

function initBtnStyle(definition,fileSize){
	var mSize = fileSize/(1024*1024);
	var size = "";
	if(mSize>1){
		size = parseInt(mSize)+"M"
	}
	if(mSize && mSize < 1){
		size = parseInt(fileSize/1024) + "KB";
	}
	$(".videobox .dwl").find("span").text("下载("+ size +")");
	
	if($(".videobox .dwl").find('span')[1]){
		$(".videobox .dwl").find('span')[1].remove();
	}
	
	if("yuanhua" == definition){
		$(".videobox .dwl").append("<span class='zt-icon yuan'> </span>");
	}else if("1300" == definition){
		$(".videobox .dwl").append("<span class='zt-icon gao'> </span>");
	}else if("1000" == definition){
		$(".videobox .dwl").append("<span class='zt-icon biao'> </span>");
	}else if("350" == definition){
		$(".videobox .dwl").append("<span class='zt-icon chang'> </span>");
	} 
	
	$(".videobox .dwl").find('span').addClass("newspan")

	$(".videobox .dwl").removeClass("dwled");
	
	if($(".videobox .defineMsg").find('font')){
		$(".videobox .defineMsg").find('font').remove();
	}

	//$(".videobox .defineMsg").append("<font size=2.4 color='#d3b58e'>"+getDlMsg(definition)+"<font>");

}

function setParam(definitionUrlMap, definitionSizeMap, definition, count, infoStr){
	//var definitions = ["350","1000","1300","yuanhua"];
	var definitions = ["yuanhua","1300","1000","350"];
	if(count==definitions.length){
//		alert("暂时没有下载地址");
		return;
	}
	if(definition && definitionUrlMap[definition] !=null && definitionUrlMap[definition].length > 0){
		//infoStr = infoStr.replace("_CURDEFINITION_", definition);
		infoStr = replaceCurDefinition(infoStr,definition);
		infoStr = replaceUrl(infoStr, definitionUrlMap[definition][0]);
		infoStr = replaceFileSize(infoStr, definitionSizeMap[definition]);
		initBtnStyle(definition,definitionSizeMap[definition]);
		$(".videobox .dwl").attr("onclick", infoStr);
	} else {
		setParam(definitionUrlMap, definitionSizeMap, definitions[count], ++count, infoStr);
	}
}

function replaceUrl(str,replaceStr){
	var urlStartCount = str.indexOf("'src':'");
	var urlEndCount = str.indexOf("',",urlStartCount);
	var preStr = str.substring(0,urlStartCount+7);
	var afterStr = str.substring(urlEndCount,str.length);
	return preStr + replaceStr + afterStr;
}

function replaceFileSize(str,replaceStr){
	var fileSizeStartCount = str.indexOf("'fileSize':");
	var fileSizeEndCount = str.indexOf(",",fileSizeStartCount);
	var preStr = str.substring(0,fileSizeStartCount+11);
	var afterStr = str.substring(fileSizeEndCount,str.length);
	return preStr + replaceStr + afterStr;
}

function replaceCurDefinition(str,replaceStr){
	var curDefStartCount = str.indexOf("'curDefinition':'");
	var curDefEndCount = str.indexOf("'}",curDefStartCount);
	var preStr = str.substring(0,curDefStartCount+17);
	var afterStr = str.substring(curDefEndCount,str.length);
	return preStr + replaceStr + afterStr;	
}

function getDlMsg(definition){
	var msg = "";
	// 大于1.6.6的版本，“设置”才可以链接，直达前端APP的activity页面
	if(getVersion() > 128){
		msg = "您可以在<a style='color:#e99e29;text-decoration:underline' onclick='settingsClick()'>设置</a>中修改清晰度";
	} else {
		msg = "您可以在设置中修改清晰度";
	}
	
	if("yuanhua" == definition){
		msg = "当前下载模式为原画, " + msg;
	}else if("1300" == definition){
		msg = "当前下载模式为高清, " + msg;
	}else if("1000" == definition){
		msg = "当前下载模式为标清, " + msg;
	}else if("350" == definition){
		msg = "当前下载模式为流畅, " + msg;
	} else {
		//没设置时候的默认值
		msg = "当前下载模式为流畅, " + msg;
	}
	return msg;
}

function settingsClick(){
	var infoStr = "{'type':'innerLink','src':'mcbox://401/0'}";
//	alert(infoStr);
	window.mctools.clickContent(infoStr);
}