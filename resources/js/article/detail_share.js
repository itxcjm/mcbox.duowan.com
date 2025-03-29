

$(document).ready(function(){
	// 供APP调用分享
	if (window.mctools && window.mctools.actionShareEntity) {
		// 申请入驻不需要分享
		var excludeId = '70837';
		var articleId = $("#articleId").val();
		var videoFlag = $("#videoFlag").val();
		if (articleId != excludeId) {
			var cover_image = $("#coverImage").val();
			var shareContent = {
				"shareInfo" : {
					"id" : articleId,
					"title" : $("#articleTitle").val(),
					"descn" : $("#introduction").val(),
					"shareUrl" : "http://mcbox.tuboshu.com/box/article/share/" + articleId + ".html",
					"imageUrl" : cover_image
				}
			};
			if (videoFlag == 1) {
				// 如果是视频类文章，则添加视频属性对象，先预留对象，以后扩展用
				shareContent.videoInfo = {};
			}
			window.mctools.actionShareEntity(JSON.stringify(shareContent));
		}
	}
})
