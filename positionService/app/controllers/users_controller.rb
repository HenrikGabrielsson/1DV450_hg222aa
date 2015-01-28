class UsersController < ApplicationController
  def index
  end
  
  def login
    user = User.find_by_email(params[:email])
    test = params[:password]
    if user && user.authenticate(params[:password])
      session[:userId] = user.id
      redirect_to key_path
    
    else
      flash[:notice] = "Inloggningen misslyckades"
      redirect_to root_path
    end

  end
  
  def logout
    session.delete(:userId)
    redirect_to root_path
  end
  
  def new
    @user = User.new
  end
  
  def create 
    @user = User.new(user_params)
    
    if @user.save
      session[:userId] = @user.id
      redirect_to key_path
    else
      flash[:notice] = @user.errors[:password]

      redirect_to action: "new" 
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :appSite, :appDescription, :password, :password_confirmation)
  end

end
