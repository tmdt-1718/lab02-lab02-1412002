class MessengerController < ApplicationController
	before_action :require_login

	def home
		@friend = Friend.where(usera:session[:user_id])
		@alluser = User.all

	end
end
