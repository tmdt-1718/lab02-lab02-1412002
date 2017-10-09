class UsersController < ApplicationController
	def new
    	@user = User.new
	end
	def create
    @user = User.new user_params
    if @user.save
      @noti = "Register success"
      render :new
      
    else
      @noti = "Something wrong!"
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit :email, :name, :password, :password_confirmation
  end
end
