class ReadMessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ReadMessageChannel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
  	result = Chat.where(usera: data['userb']).where(userb: data['usera'])
  	
  	result.update(read:true)
  	ActionCable.server.broadcast(
 		"ReadMessageChannel_#{data['userb']}",
  		data
		)
  	ActionCable.server.broadcast(
 		"ReadMessageChannel_#{data['usera']}",
  		data
		)
  end
end
