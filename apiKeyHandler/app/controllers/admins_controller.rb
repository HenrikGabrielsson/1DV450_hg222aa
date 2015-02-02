class AdminsController < ApplicationController
  
  #get
  def index
  end
  
  #post 
  def login
    admin = Admin.find_by_userName(params[:userName])

    #loggar in om uppgifterna var rätt
    if admin && admin.authenticate(params[:password])
      session[:adminId] = admin.id
      redirect_to keys_path
    
    else
      flash[:notice] = "Inloggningen misslyckades"
      redirect_to admins_path
    end

  end

end
