class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_for current_user
    stream_from "RoomChannel_#{params[:room]}"

    # stream_from "RoomChannel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
  	    Chat.create! usera:data['usera'], userb:data['userb'], body:data['body']
  end
end
