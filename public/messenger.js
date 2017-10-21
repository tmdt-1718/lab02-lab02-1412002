$(document).ready(function() {
    friend_tools();
    $(".chat-input-text").focus();
    connectSocket();
    $(".input-search").keyup(function(e) {
        search_friend(e);
    });
    $(".btn-friend-waiting").on("click",function(e){
        $(".friend-waiting-panel").toggle(100);
    })
    send_mess();
    addFriend();
	removeFriend();
    comfirmFriend();
    friend_select();
    onChatRead();
    $(".chat-contents-form").animate({ scrollTop: $('.chat-contents-form').height()+1000}, 300);
    init_message();
})
var init_message = function(){
    $(".chuadoc").addClass("message-unread");
    $(".chuadoc").parent().parent().addClass("message-unread");
    var temp = $(".chuadoc").parent().parent();
    $(".chuadoc").parent().parent().remove();
    $(".friend-list").prepend(temp);
    $("#"+$(".current-friend-chat").text().trim()).addClass("friend-active");
    reload_event();
}
var friend_select = function(){
    $(".friend-item").on("click",function(e){
        $(".friend-item").removeClass("friend-active");
        $(e.currentTarget).addClass("friend-active");
        $(".current-friend-chat").html($(e.currentTarget).attr("id"));
        $(".current-friend-name").html($(e.currentTarget).find(".friend-name").text().trim().trim().split("\n")[0]);
        $(".chat-contents-form").html("");
        var usera = $(".current-userid").text().trim();
        var userb = $(".current-friend-chat").text().trim();
        var data = {
            usera: usera,
            userb: userb,
        };
        App.loadMessage.speak(data);
        App.readMessage.speak(data);
        $(".chat-input-text").focus();
    })
}
var onChatRead = function(){
    $(".chat-input-text").on("keyup",function(){
        var usera = $(".current-userid").text().trim();
        var userb = $(".current-friend-chat").text().trim();
        var data = {
            usera: usera,
            userb: userb,
        };
        App.readMessage.speak(data);
    });
}
var loadMessage = function(data){
    //console.log(data);
    var usera = $(".current-userid").text().trim();

    data.reverse().map(key=>{
        if(usera==key.usera){
            $(".chat-contents-form").append("<div class='chat-line-right'><div class='my-chat-class'>" + key.body + "</div></div>")
        }else{
            $(".chat-contents-form").append("<div class='chat-line-left'><div class='my-chat-class'>" + key.body + "</div></div>")
        }
    });
    $(".chat-contents-form").animate({ scrollTop: $('.chat-contents-form').height()+1000}, 300);
    if(data[data.length-1].read){
        $(".daxem").show();
    }

}

var send_mess = function() {
    $(".btn-send").on("click", function(e) {
        var mess = $(".chat-input-text").val();
        var usera = $(".current-userid").text().trim();
        var userb = $(".current-friend-chat").text().trim();

        var data = {
            usera: usera,
            userb: userb,
            body: mess,
        }

        App.room.speak(data);
        var mess = $(".chat-input-text").val("");
        $(".daxem").hide();
    });

}

var received_mess = function(data) {
    var myid = $(".current-userid").text().trim();
    //console.log(data);
    if (data.usera == myid) {
        var cClass = "chat-line-right";
        $(".chat-contents-form").append("<div class='" + cClass + "'><div class='my-chat-class'>" + data.body + "</div></div>");
            $(".chat-contents-form").animate({ scrollTop: $('.chat-contents-form').height()+1000}, 200);

    } else {
        var cClass = "chat-line-left";
        var usera = $(".current-friend-chat").text().trim();
        if(usera==data.usera){
            $(".chat-contents-form").append("<div class='" + cClass + "'><div class='my-chat-class'>" + data.body + "</div></div>");
            $(".chat-contents-form").animate({ scrollTop: $('.chat-contents-form').height()+1000}, 200);
        }else{
            $(".friend-list #"+data.usera).find(".preview-message").html(data.body).addClass("message-unread");
            $(".friend-list #"+data.usera).addClass("message-unread");
            var temp = $(".friend-list #"+data.usera);
            $(".friend-list #"+data.usera).remove();
            $(".friend-list").prepend(temp);
            reload_event();
        }
    }
}

var addFriend = function() {
    $(".friend-add").on("click", function(e) {
        e.stopPropagation();
        $(e.currentTarget).addClass("friend-remove").removeClass("friend-add");
        var e = $(e.currentTarget).parent();
        var friendID = e.find(".friend-id").text().trim();
        var usera = $(".current-userid").text().trim();
        var userb = friendID;
        var data = {
        	usera:usera,
        	userb:userb,
        }

        App.friend.speak(data);
    });

}
var update_addFriend = function(data){
    $(".friend-list").append('<div class="friend-item" id="'+data.id+'" >'+
                    '<div class="friend-id" style="display: none;">'+
                        data.id+
                    '</div>'+
                    '<div class="friend-avatar">'+
                        data.name[0]+
                    '</div>'+
                    '<div class="friend-name">'+
                        data.name+
                    '</div>'+
                    '<div class="friend-remove" style="display: none;">'+
                    '</div>' +
                '</div>');
    $("#request"+data.id).remove();
    reload_event();
}
var comfirmFriend = function(){
    $(".friendWaiting-add").on("click",function(e){
        e.stopPropagation();
        var id = $(e.currentTarget).parent().find(".friendWaiting-id").text().trim();
        var usera = $(".current-userid").text().trim();
        var data = {
                    usera:id,
                    userb:usera,
                };
        App.Confirm.speak(data);

    })
}
var update_friendRequest = function(data){
    $(".friend-waiting-panel").append('<div class="friendWaiting-item" id="request'+data.id+'">'+
                                        '<div class="friendWaiting-id" style="display: none;">'+data.id+'</div>'+
                                        '<div class="friendWaiting-avatar">'+data.name[0]+'</div>'+
                                        '<div class="friendWaiting-name">'+data.name+'</div>'+
                                        '<div class="friendWaiting-add">Confirm</div>'+
                                        '<div class="friendWaiting-remove">Remove</div></div>')
    reload_event();
}


var reload_event = function(){
    $(".switch-alluser").off("click");
    $(".switch-friends").off("click");
    $(".friend-item").off("hover");
    $(".friend-add").off("click");
    $(".friend-remove").off("click");
    $(".friendWaiting-add").off("click");
    $(".friend-item").off("click");
    $(".chat-input-text").off("keyup");
    friend_tools();
    addFriend();
    removeFriend();
    comfirmFriend();
    friend_select();
    onChatRead();
}
var reloadFriendList = function(data){
	$(".friend-list").html("");
	data.map(key=>{
		$(".friend-list").append('<div class="friend-item">'+
								'<div class="friend-id" style="display: none;">'+
								'');
	})
	

}

var removeFriend = function(){
	$(".friend-remove").on("click",function(e){
        e.stopPropagation();
        var e = $(e.currentTarget).parent();
        var friendID = e.find(".friend-id").text().trim();
        var usera = $(".current-userid").text().trim();
        var userb = friendID;
		var data = {
        	usera:usera,
        	userb:userb,
        }
        App.RemoveFriend.speak(data);
	})
}
var update_removeFriend = function(data){
    $(".friend-list #"+data.userb).remove();
    $(".friend-list #"+data.usera).remove();
    $(".alluser-list #"+data.usera + " .friend-remove").addClass("friend-add").removeClass("friend-remove");
    $(".alluser-list #"+data.userb + " .friend-remove").addClass("friend-add").removeClass("friend-remove");
    reload_event();
}
var search_friend = function(e) {
    var val = $(".input-search").val().toLowerCase();
    var tab = $(".switch-active").text().trim()[0];
    $(".friend-item").show();
    if (tab == "F") {
        var friend = $(".friend-list .friend-item");
    } else {
        var friend = $(".alluser-list .friend-item");
    };
    friend.map(key => {
        var check = $($(friend[key]).find(".friend-name")).text().trim().toLowerCase().indexOf(val);
        if (check == -1) {
            $($(friend[key])).hide();
        }
    })
}

var friend_tools = function() {
    // $(".input-search").focus();

    $(".switch-alluser").on("click", function(e) {
        $(".alluser-list").show();
        $(".friend-list").hide();
        $(".switch-friends").removeClass("switch-active");
        $(".switch-alluser").addClass("switch-active");
        $(".input-search").attr('placeholder', 'search a user').focus();
    });
    $(".switch-friends").on("click", function(e) {
        $(".alluser-list").hide();
        $(".friend-list").show();
        $(".switch-friends").addClass("switch-active");
        $(".switch-alluser").removeClass("switch-active");
        $(".input-search").attr('placeholder', 'search a friend').focus();
    });
    $(".friend-item").hover(function(e) {
        $(e.currentTarget).find(".friend-add").show();
        $(e.currentTarget).find(".friend-remove").show();
    }, function(e) {
        $(e.currentTarget).find(".friend-add").hide();
        $(e.currentTarget).find(".friend-remove").hide();
    });
}

var update_readMessage = function(data){
    var f = $(".current-friend-chat").text().trim();
    if( f==data.usera){
        $(".daxem").show();
    };
    var usera = $(".current-userid").text().trim();

    if(usera=data.usera){
        $(".friend-list #"+data.userb).removeClass("message-unread");
        $(".friend-list #"+data.userb +" .preview-message").removeClass("message-unread");

    }

}

var connectSocket = function() {
    this.App = {};

    App.cable = ActionCable.createConsumer();


    var roomID = $(".current-userid").text().trim();

    App.room = App.cable.subscriptions.create({ channel: 'RoomChannel', room: roomID }, {
        connected: function() {
        },
        disconnected: function() {},
        received: function(data) {
            received_mess(data);
        },
        speak: function(message) {
            return this.perform('speak', message);
        }
    });

    App.friend = App.cable.subscriptions.create({ channel: 'FriendChannel', room: roomID }, {
        connected: function() {
        },
        disconnected: function() {},
        received: function(data) {
            update_friendRequest(data);
        },
        speak: function(message) {
            return this.perform('speak', message);
        },
    });

    App.RemoveFriend = App.cable.subscriptions.create({ channel: 'RemoveFriendChannel', room: roomID }, {
        connected: function() {
        },
        disconnected: function() {},
        received: function(data) {
            update_removeFriend(data);
        },
        speak: function(message) {
            return this.perform('speak', message);
        }
    });
    App.Confirm = App.cable.subscriptions.create({ channel: 'ComfirmFriendChannel', room: roomID }, {
        connected: function() {
        },
        disconnected: function() {},
        received: function(data) {
            update_addFriend(data);
        },
        speak: function(message) {
            return this.perform('speak', message);
        }
    });
    App.loadMessage = App.cable.subscriptions.create({ channel: 'LoadMessageChannel', room: roomID }, {
        connected: function() {

        },
        disconnected: function() {},
        received: function(data) {
            loadMessage(data);
        },
        speak: function(message) {
            return this.perform('speak', message);
        }
    });
    App.readMessage = App.cable.subscriptions.create({ channel: 'ReadMessageChannel', room: roomID }, {
        connected: function() {

        },
        disconnected: function() {},
        received: function(data) {
            update_readMessage(data);
        },
        speak: function(message) {
            return this.perform('speak', message);
        }
    });

}