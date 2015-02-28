class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery :except => [:authenticate_api_user]
  
  include ApplicationHelper
  include AuthHelper
  
  around_filter :catch_not_found

  #offset and limit to be used for pagination. 
  def pagination
    if params[:offset].present?
      @offset = params[:offset].to_i
    end
    if params[:limit].present?
      @limit = params[:limit].to_i
    end
    @offset ||= 0
    @limit  ||= 20
  end
  
  #developers need api key
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
  
  #fångar upp routing errors
  def routingError
    render json:{error: "Felaktig förfrågan. Försök igen."}, status: :not_found
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
