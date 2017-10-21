class FriendBroadcastJob < ApplicationJob
  queue_as :default


  def perform(data)
  # 	newfriend = User.find(data.userb)
  #   ActionCable.server.broadcast(
  # 		"FriendChannel_#{data.usera}",
  # 		newfriend
		# )
    
  	newrequest = User.find(data.usera)
    ActionCable.server.broadcast(
  		"FriendChannel_#{data.userb}",
  		newrequest
		)
  end

  
end
