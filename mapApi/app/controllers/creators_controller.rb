class CreatorsController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_key
  before_action :authenticate_api_token, only: [:destroy, :update]
  before_action :pagination, only:[:index]
  
  skip_around_action :catch_not_found
  
  #/creators
  def index
    creators = Creator.all
    respond_with creators.limit(@limit).offset(@offset)
  end

  #/creators/{id}
  def show
    creator = Creator.find_by_id(params[:id])
    
    if creator.present? 
      respond_with creator
    else
      render json:{error: "Det finns ingen användare med detta id"},status: :not_found
    end
  end
  
  #create new creator
  def create 
    creator = Creator.new(creator_params)
    
    #om det går att spara.
    if creator.save
      respond_with creator  
    end    
  end

  #remove creator.
  def destroy
    #creator must be logged in to be allowed to delete own account
    if get_auth_user_data["id"].to_i == params[:id].to_i

      creator = Creator.find(get_auth_user_data["id"])  
      creator.destroy
    
      render json:{message: "Användaren togs bort."}, status: :ok
    else
      render json:{error: "Du får inte ta bort denna användare"}, status: :forbidden
    end
  
  end

  #update creator information
  def update
    #creator must be logged in to be allowed to update own account
    if get_auth_user_data["id"].to_i == params[:id].to_i

      creator = Creator.find(get_auth_user_data["id"])  
      creator.update(creator_params)
      creator.save
    
      render json:{message: "Användaren uppdaterades"}, status: :ok
    else
      render json:{error: "Du får inte ändra denna användare"}, status: :forbidden
    end
  end
  
  private 
  
  #strong params
  def creator_params
    params.require(:creator).permit(:userName, :email, :password, :password_confirmation)
  end

  
end
