class MessengerController < ApplicationController
	def home
		@friend = Friend.where(usera:session[:user_id])
		@alluser = User.all
	end
end
