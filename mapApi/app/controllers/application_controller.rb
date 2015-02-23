class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery :except => [:authenticate_api_user]
  
  include ApplicationHelper
  include AuthHelper
  
  around_filter :catch_not_found

  def authenticate_api_user
    @payload = authenticate_api_key
    
    if @payload == false
      render json: { error: "Det gick inte att autentisera användaren." }, status: :unauthorized
    end
  end
  
  #kollar så man är inloggad som user. Annars redirect till startsida
  def authenticate_user(id)
    if get_user_id.nil? || get_user_id.to_s != id.to_s

      flash[:notice] = "Du måste vara inloggad först."
      redirect_to root_path
    end  
  end
  
  #kollar så man är inloggad som admin. Annars redirect till startsida
  def authenticate_admin
    if get_admin_id.nil?
      flash[:notice] = "Du måste vara inloggad som administratör först."
      redirect_to root_path
    end
  end
  
  
  private

  #om ett objekt inte hittas skickas man till root.
  def catch_not_found
    yield
  rescue ActiveRecord::RecordNotFound
    flash[:notice] = "Hittades inte"
    redirect_to root_url
  end
  
 
end
