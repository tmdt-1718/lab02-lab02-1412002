$(document).ready(function(){
	$(".sign-in-email input").focus();
	$(".sign-in-form input").keyup(function(){
		check_login_input();
	});
	$(".sign-up-switch-button").on("click",function(e){
		$(".sign-in-form").hide(1000);
		$(".sign-up-form").show(1000);
		$(".sign-up-switch-button").hide();
		$(".sign-in-switch-button").show();
		$(".form-title").html("REGISTER");
		change_to_signup();
	})
	$(".sign-in-switch-button").on("click",function(event){
			$(".sign-in-form").show(1000);
			$(".sign-up-form").hide(1000);
			change_to_signin();
			$(".sign-up-switch-button").show();
			$(".sign-in-switch-button").hide();
			$(".form-title").html("LOGIN");
		})
})

var check_login_input = function(){
	if($(".sign-in-email input").val()&&$(".sign-in-password input").val()){
		$(".sign-in-submit-btn button").addClass("active-button");
		$(".sign-in-submit-btn button").removeAttr('disabled');
	}else{
		$(".sign-in-submit-btn button").removeClass("active-button");
		$(".sign-in-submit-btn button").attr('disabled','disabled');
	
	}
}
var change_to_signup = function(){
	$(".user-form").css({
		"background": "#ee2954",
		"box-shadow": "0 0 10px #ee2a54",
	});
	$(".form-title").css({
		"color": "#fff",
		"border-left": "4px solid #fff"
	});
	$(".sign-up-form input").css({
		"background": "#ee2a54",
		"color": "#fff"
	}).addClass("inputquai");
	$(".sign-up-submit-btn input").css({
		"background": "#fff",
		"color": "#ee2a54",
		"width":"150px"
	})
}
var change_to_signin = function(){
	$(".user-form").css({
		"background": "#fff",
		"box-shadow": "0 0 10px #ddd",
	});
	$(".form-title").css({
		"color": "#ee2954",
		"border-left": "4px solid #ee2954"
	});
	$(".sign-up-form input").css({
		"background": "#fff",
		"color": "#ee2954"
	}).addClass("inputquai");
	$(".sign-up-submit-btn input").css({
		"background": "#fff",
		"color": "#ee2a54",
		"width":"150px"
	})
}