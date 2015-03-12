class CreatorsController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_key
  before_action :authenticate_api_token, only: [:destroy, :update, :me]
  before_action :pagination, only:[:index]
    
  #no csrf-crap for api!!
  skip_before_filter  :verify_authenticity_token
  
  skip_around_action :catch_not_found
  
  #/creators
  def index
    respond_with Creator.limit(@limit).offset(@offset)
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

  #show logged in user
  def me
    params[:id] = @payload["id"]
    show
  end
  

  #create new creator
  def create 
    creator = Creator.new(creator_params)
    
    #om det går att spara.
    if creator.save
      respond_with creator   
    else
      render json:{error: creator.errors.full_messages}, status: :bad_request
    end 
    
  end

  #remove creator.
  def destroy
    #creator must be logged in to be allowed to delete own account
    if @payload["id"].to_i == params[:id].to_i

      creator = Creator.find(@payload["id"])  
      creator.destroy
    
      render json:{message: "Användaren togs bort."}, status: :ok
    else
      render json:{error: "Du får inte ta bort denna användare"}, status: :forbidden
    end
  
  end

  #update creator information
  def update
    
    
    
    #creator must be logged in to be allowed to update own account
    if @payload["id"].to_i == params[:id].to_i
      
      creator = Creator.find(params[:id])  
      creator.update(creator_params)
      puts "test"
      
      if creator.save
        render json:{message: "Användaren uppdaterades"}, status: :ok
      else
        render json:{error: creator.errors.full_messages}, status: :bad_request
      end
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
