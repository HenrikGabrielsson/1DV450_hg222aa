class AdminsController < ApplicationController
  def index
  end
  
  def login
    admin = Admin.find_by_userName(params[:userName])

    if admin && admin.authenticate(params[:password])
      session[:adminId] = admin.id
      redirect_to keys_path
    
    else
      flash[:notice] = "Inloggningen misslyckades"
      redirect_to admins_path
    end

  end
  
  def logout
    session.delete(:adminId)
    redirect_to root_path
  end
  
end
