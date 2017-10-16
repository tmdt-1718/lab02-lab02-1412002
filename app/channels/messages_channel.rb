class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages_bw_#{params[:usera]}_#{params[:userb]}'
  end
end