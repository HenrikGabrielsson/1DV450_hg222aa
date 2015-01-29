module KeysHelper
  
  def check_login
    if session[:userId].nil?
      flash[:notice] = "Du måste vara inloggad först"
      redirect_to root_path
    end
  end
  
  
end
