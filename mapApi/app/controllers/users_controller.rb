class UsersController < ApplicationController
  respond_to :json, :xml
  
  def index
    @users = User.all
    respond_with @users
  end

  def show
    @user = User.find(params[:id])
    respond_with @user
  end
  
  def create 
    @user = User.new(user_params)
    
    #om det går att spara. Annars tillbaka och visa felmeddelanden.
    if @user.save
      respond_with @user
    end    
  end

  def destroy
  end

  def update
  end
  
  private 
  
  def user_params
    params.require(:user).permit(:userName, :email, :password, :password_confirmation)
  end

  
end
