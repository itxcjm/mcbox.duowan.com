

$(document).ready(function(){
	$("body").css("padding-top",$(".dwlBanner")[0].offsetHeight);
	//jquery图片播放
	$('.fancybox').fancybox({
		width : "600px",
		height : "450px",
		maxWidth : "800px",
		maxHeight : "600px",
		nextEffect : "fade",
		prevEffect : 'fade',
		fixed : false,/*是否与背景遮罩定位*/
		autoScale : true,
		nextSpeed : 500,
		prevSpeed : 500,
		tpl : {
			next     : '<a title="下一张" class="fancybox-nav fancybox-next" style="height:20%;top:40%" href="javascript:;"><span style="top:50%" ></span></a>',
			prev     : '<a title="上一张" class="fancybox-nav fancybox-prev" style="height:20%;top:40%" href="javascript:;"><span style="top:50%" ></span></a>'
		}
	});
})
