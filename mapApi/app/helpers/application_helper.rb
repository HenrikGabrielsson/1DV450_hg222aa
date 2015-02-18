module ApplicationHelper

  #hämtar admin id
  def get_admin_id
    session[:adminId]
  end
  
  #hämtar inloggad users id  
  def get_user_id
    session[:userId]
  end
  
  
end
