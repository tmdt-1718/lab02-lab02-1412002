$(document).ready(function () {
	friend_tools();
	connectSocket();

	$(".input-search").keyup(function(e){
		search_friend(e);
	})	
	send_mess();
})

var send_mess = function(){
	$(".btn-send").on("click",function(e){
		var mess = $(".chat-input-text").val();
		var usera = $(".current-userid").text().trim();
		var userb = $(".current-friend-chat").text().trim();

		var data = {
			usera:usera,
			userb:userb,
			body:mess,
		}

		App.room.speak(data);
		var mess = $(".chat-input-text").val("");

	})
}

var received_mess = function(data){
	var myid = $(".current-userid").text().trim();
	console.log(data);
	if(data.usera == myid ){
		var cClass = "my-chat-class";
	}else{
		var cClass = "friend-chat-class";
	}
	$(".chat-contents-form").append("<div class='"+cClass+"'>"+data.body+"</div>")

}

var search_friend = function(e){
	var val = $(".input-search").val();
	var tab = $(".switch-active").text().trim()[0];
	$(".friend-item").show();
	if(tab=="F"){
		var friend = $(".friend-list .friend-item");
	}else{
		var friend = $(".alluser-list .friend-item");
	};
	friend.map(key=>{
		var check = $($(friend[key]).find(".friend-name")).text().trim().indexOf(val);
		if(check==-1){
			$($(friend[key])).hide();
		}
	})
}

var friend_tools = function(){
	$(".input-search").focus();

	$(".switch-alluser").on("click",function(e){
		$(".alluser-list").show();
		$(".friend-list").hide();
		$(".switch-friends").removeClass("switch-active");
		$(".switch-alluser").addClass("switch-active");
		$(".input-search").attr('placeholder','search a user').focus();
	});
	$(".switch-friends").on("click",function(e){
		$(".alluser-list").hide();
		$(".friend-list").show();
		$(".switch-friends").addClass("switch-active");
		$(".switch-alluser").removeClass("switch-active");
		$(".input-search").attr('placeholder','search a friend').focus();
	});
	$(".friend-item").hover(function(e){
		$(e.currentTarget).find(".friend-add").show();
		$(e.currentTarget).find(".friend-remove").show();
	},function(e){
		$(e.currentTarget).find(".friend-add").hide();
		$(e.currentTarget).find(".friend-remove").hide();
	});
}

var connectSocket = function(){

this.App = {};

App.cable = ActionCable.createConsumer();  

var roomID = $(".current-userid").text().trim();

App.room = App.cable.subscriptions.create({channel: 'RoomChannel', room: roomID}, {
  connected: function() {
    return console.log("connected");
  },
  disconnected: function() {},
  received: function(data) {
  	received_mess(data);
  },
  speak: function(message) {
    return this.perform('speak',message);
  }
});
}