$(document).ready(function () {
	$(".switch-alluser").on("click",function(e){
		$(".alluser-list").show();
		$(".friend-list").hide();
		$(".switch-friends").removeClass("switch-active");
		$(".switch-alluser").addClass("switch-active");
	});
	$(".switch-friends").on("click",function(e){
		$(".alluser-list").hide();
		$(".friend-list").show();
		$(".switch-friends").addClass("switch-active");
		$(".switch-alluser").removeClass("switch-active");
	})
})