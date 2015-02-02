module KeysHelper
  
  def check_login
    if session[:userId].nil?
      flash[:notice] = "Du måste vara inloggad först."
      redirect_to root_path
    end
  end
  
  def check_admin_login
    if session[:adminId].nil?
      flash[:notice] = "Du måste vara inloggad som administratör först."
      redirect_to root_path
    end
  end
  
  def get_user_id
    session[:userId]
  end
  
  
end
