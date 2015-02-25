module AuthHelper
  
  #used to authenticate a developer's api key, and increment callcount for that key.
  def authenticate_api_key
    
    if request.headers["ApiKey"].present?
      key = Key.find_by(key: request.headers["ApiKey"])
    end
    #key not valid
    if key.nil?
      render json: { error: "Det gick inte att autentisera dig. Kolla din API-nyckel." }, status: :unauthorized 
    
    else
      #increment number of calls for the key.
      key.callCount += 1
      key.save
    end
  end
  
  #authenticate an end user through api (creator)
  def authenticate_api_token
    if request.headers["Authorization"].present?
      
      auth_header = request.headers['Authorization'].split(' ').last
      
      #try to get the data from jwt token
      @payload = decode auth_header
      
      #couldnt get data for whatever reason
      if !@payload
        render json: { error: "Problem med autentiseringssträngen. Försök att logga in igen." }, status: :bad_request 
      #success!
      else
        @payload
      end
    #no token was sent with header  
    else
      render json: { error: "En autentiseringssträng krävs."}, status: :forbidden # The header isn´t present
    end
  end
  
  #encode jwt token with some user info.
  def encode(creator)
    #data to be saved in JSON
    payload = { id: creator.id, userName: creator.userName, expires: 2.hours.from_now.to_i}
    
    #very much safe
    JWT.encode( payload, Rails.application.secrets.secret_key_base, "HS512")
  end
  
  #check so jwt token looks ok
  def decode(token)
    payload = JWT.decode(token, Rails.application.secrets.secret_key_base, "HS512")
    
    #check expiration time and return if still fresh
    if payload[0]["expires"] >= Time.now.to_i
      payload[0]
    
    #old token
    else
      false
    end
    
  #couldn't decode token
  rescue
    false
  end
    
end
