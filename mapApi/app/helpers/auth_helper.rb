module AuthHelper
  def authenticate_api_key
    
    if request.headers["ApiKey"].present?
      @key = Key.find_by(key: request.headers["ApiKey"])
    end
    if @key.nil?
      render json: { error: "Det gick inte att autentisera dig. Kolla din API-nyckel." }, status: :unauthorized 
    
    else
      @key.callCount += 1
      @key.save
    end
  end
  
  #autentiserar en användare genom api:et
  def authenticate_api_token
    if request.headers["Authorization"].present?
      
      auth_header = request.headers['Authorization'].split(' ').last
      
      @payload = decode auth_header
      if !@payload
        render json: { error: "Problem med autentiseringssträngen." }, status: :bad_request 
      else
        @payload
      end
    else
      render json: { error: "En autentiseringssträng krävs."}, status: :forbidden # The header isn´t present
    end
  end
  
  def get_auth_user_data
    authenticate_api_token
  end
  
  #skapa jwt
  def encode(creator)
    payload = { id: creator.id, userName: creator.userName, expires: 2.hours.from_now.to_i}
    
    JWT.encode( payload, Rails.application.secrets.secret_key_base, "HS512")
  end
  
  #kontrollera jwt
  def decode(token)
    payload = JWT.decode(token, Rails.application.secrets.secret_key_base, "HS512")
    
    if payload[0]["expires"] >= Time.now.to_i
      payload[0]
    
    #gammal token
    else
      false
    end
    
  #felaktig token
  rescue
    false

  end
    
end
