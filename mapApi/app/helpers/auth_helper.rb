module AuthHelper
  def authenticate_api_key
    
    @key = Key.find_by(key: params[:api_key])
    
    if @key.nil?
      render json: { error: "Det gick inte att autentisera dig." }, status: :unauthorized 
    
    else
      @key.callCount += 1
      @key.save
    end
  end
    
end
