class RemoveFriendChannel < ApplicationCable::Channel
  def subscribed
    stream_from "RemoveFriendChannel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
  	Friend.where(usera: data['usera']).where(userb: data['userb']).or(Friend.where(usera: data['userb']).where(userb: data['usera'])).destroy_all
  end
end
