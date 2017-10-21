class AfterComfirmJob < ApplicationJob
  queue_as :default

  def perform(data)
    # Do something later
    newfriendb = User.find(data.userb)
    ActionCable.server.broadcast(
  		"ComfirmFriendChannel_#{data.usera}",
  		newfriendb
		)
    newfrienda = User.find(data.usera)
    ActionCable.server.broadcast(
  		"ComfirmFriendChannel_#{data.userb}",
  		newfrienda
		)
  end
end
