class FriendChannel < ApplicationCable::Channel
  def subscribed
    stream_from "FriendChannel_#{params[:room]}"
    
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
  	Friend.create! usera:data['usera'], userb:data['userb'], accept:false
  end

  
end
