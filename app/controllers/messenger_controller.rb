class MessengerController < ApplicationController
	before_action :require_login

	def home
		@friend = Friend.where(usera:session[:user_id]).where(accept:true).or(Friend.where(userb:session[:user_id]).where(accept:true))
		@alluser = User.all
		@friendWaiting = Friend.where(usera:session[:user_id]).where(accept:false).or(Friend.where(userb:session[:user_id]).where(accept:false))
	end
end