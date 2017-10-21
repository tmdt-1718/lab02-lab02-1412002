class LoadMessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "LoadMessageChannel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
  	result = Chat.where(usera: data['usera']).where(userb: data['userb']).or(Chat.where(usera: data['userb']).where(userb: data['usera'])).order('id DESC').limit(20)
  	
  	ActionCable.server.broadcast(
 		"LoadMessageChannel_#{data['usera']}",
  		result
		)
  end
end
