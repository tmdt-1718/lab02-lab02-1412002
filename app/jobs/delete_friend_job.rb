class DeleteFriendJob < ApplicationJob
  queue_as :default
  def perform(data)
    ActionCable.server.broadcast(
  		"RemoveFriendChannel_#{data.usera}",
  		data
		)
    ActionCable.server.broadcast(
  		"RemoveFriendChannel_#{data.userb}",
  		data
		)
  end
end
