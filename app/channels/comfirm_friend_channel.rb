class ComfirmFriendChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ComfirmFriendChannel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
  	ff = Friend.where(usera: data['usera']).where(userb: data['userb'])
  	ff.update(accept:true)
  end
end
