class CreatorsController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_key
  before_action :authenticate_api_token, only: [:destroy, :update]
  
  def index
    @creators = Creator.all
    respond_with @creators, except: [:password_digest]
  end

  def show
    @creator = Creator.find(params[:id])
    respond_with @creator, except: [:password_digest]
  end
  
  def create 
    @creator = Creator.new(creator_params)
    
    #om det går att spara.
    if @creator.save
      respond_with @creator
    end    
  end

  def destroy
    if get_auth_user_data["id"].to_i == params[:id].to_i

      @creator = Creator.find(get_auth_user_data["id"])  
      @creator.destroy
    
      render json:{message: "Användaren togs bort."}, status: :ok
    else
      render json:{error: "Du får inte ta bort denna användare"}, status: :forbidden
    end
  
  end

  def update
    if get_auth_user_data["id"].to_i == params[:id].to_i

      @creator = Creator.find(get_auth_user_data["id"])  
      @creator.update(creator_params)
      @creator.save
    
      render json:{message: "Användaren uppdaterades"}, status: :ok
    else
      render json:{error: "Du får inte ändra denna användare"}, status: :forbidden
    end
  end
  
  private 
  
  def creator_params
    params.require(:creator).permit(:userName, :email, :password, :password_confirmation)
  end

  
end
