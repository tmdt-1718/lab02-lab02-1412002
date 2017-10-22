class SessionsController < ApplicationController
  	def new
      	if session[:user_id] 
        	redirect_to "/messenger"
      	end
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
  		log_out
    	redirect_to login_path
 	end
    def home
      if session[:user_id] 
          redirect_to "/messenger"
      else
          redirect_to "/login"
      end
    end
end
