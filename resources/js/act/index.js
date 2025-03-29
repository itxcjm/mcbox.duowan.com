
$(function() {
	var actId = $("#actId").val();
	// 获取参赛人数
	$.ajax({
		type : "GET",
		async: false, 
		url : "/act/countWorks",
		data : {
			actId : actId,
			timestamp:new Date().getTime()
		},
		dataType : "json",
		success : function(data, status) {
			var ret = data.data;
			//alert(ret.count);
			$("div.msg span").text(ret.count);
		},
		error : function() {
			alert("请求发生错误");
		}
	});//ajax
});

function enroll(enrollUrl) {
	// 直接弹出YY登录进行报名：因为设计初并没有涉及用户登录、退出
	login_udb(enrollUrl);
}
