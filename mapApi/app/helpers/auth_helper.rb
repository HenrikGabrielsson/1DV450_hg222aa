module AuthHelper
  def authenticate_api_key
    if Key.find_by(key: params[:api_key]).nil?
      render json: { error: "Det gick inte att autentisera dig." }, status: :unauthorized 
    end
  end
    
end
