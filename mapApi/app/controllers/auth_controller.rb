class AuthController < ApplicationController

  before_action :authenticate_api_key
  
  #no csrf-crap for api!!
  skip_before_filter  :verify_authenticity_token
  
  #lets user login via api
  def api_login
    
    puts "test1"
    puts params[:userName]
    puts params[:password]
    puts "tes2t"
    
    #check credentials
    creator = Creator.find_by(userName: params[:userName])
    if creator && creator.authenticate(params[:password])
      
      #create jwt token
      render json: { token: encode(creator) }, status: :ok
    else
      render json: { error: 'Felaktigt användarnamn och/eller lösenord' }, status: :unauthorized
    end    
  end
  
end
