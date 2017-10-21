class AfterLoadMessageJob < ApplicationJob
  queue_as :default

  def perform(data)
    ActionCable.server.broadcast(
  		"LoadMessageChannel_#{data.usera}",
  		result
		)
  end
end
