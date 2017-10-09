class SessionsController < ApplicationController
  	def new
    	@user = User.new
  	end

	def create
	    user = User.find_by email: params[:email].downcase
	    if user && user.authenticate(params[:password])
	      #TODO save user infor into session
	        log_in user
      		redirect_to "/messenger"
	    else
	      @noti = "Invalid email/password combination!"
    		@user = User.new
	      render template: "users/new"
	    end
  	end
  	
  	def destroy
 	end
end
