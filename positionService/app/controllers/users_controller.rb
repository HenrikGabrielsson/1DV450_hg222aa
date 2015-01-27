class UsersController < ApplicationController
  def index
  end
  
  def new
    @user = User.new
  end
  
  def create 
    @user = User.new(user_params)
    
    if @user.save
      session[:userId] = @user.id
    else
    end
    
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :appSite, :appDescription, :password)
  end

end
