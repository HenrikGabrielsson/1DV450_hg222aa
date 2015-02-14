class UsersController < ApplicationController
  
  before_filter -> { authenticate_user params[:id] }, only: [:show]
  
  #inloggningssida
  def index
    if get_user_id.nil? == false
      redirect_to user_path get_user_id
    end
    
  end
  
  #visa användarens "profilsida"
  def show
    @user = User.find(params[:id])    
  end
  
  def login
    user = User.find_by_email(params[:email].downcase)

    #om användaren finns och lösenord stämmer.
    if user && user.authenticate(params[:password])
      session[:userId] = user.id
      redirect_to user_path(user.id)
    
    else
      flash[:notice] = "Inloggningen misslyckades"
      redirect_to root_path
    end

  end
  
  #tar bort user/admin session
  def logout
    session.delete(:userId)
    session.delete(:adminId)
    redirect_to root_path
  end
  
  #inloggning
  def new
    @user ||= User.new
  end
  
  #registrering av användare.
  def create 
    @user = User.new(user_params)
    
    #om det går att spara. Annars tillbaka och visa felmeddelanden.
    if @user.save
      
      #inloggning
      session[:userId] = @user.id
      
      #nyckel skapas och sparas (nyckel slumpas fram)
      @user.key = Key.create
      
      redirect_to key_path(@user.key.id)
    else
      render :new 
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :appSite, :appDescription, :password, :password_confirmation)
  end

end
