class RoomBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    # Do something later
    ActionCable.server.broadcast(
  		"RoomChannel_#{message.usera}",
  		message
		)
    ActionCable.server.broadcast(
  		"RoomChannel_#{message.userb}",
  		message
		)
  end

end
