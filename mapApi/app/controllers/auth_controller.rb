class AuthController < ApplicationController

  before_action :authenticate_api_key
  
  #låter en användare logga in genom api:et
  def api_login
    creator = Creator.find_by(userName: params[:userName])
    if creator && creator.authenticate(params[:password])
      
      render json: { token: encode(creator) }
    else
      render json: { error: 'Felaktigt användarnamn och/eller lösenord' }, status: :unauthorized
    end    
  end
  
end
