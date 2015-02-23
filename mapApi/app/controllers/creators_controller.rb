class CreatorsController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_token, only: [:destroy, :update]
  before_action :authenticate_api_key
  
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
    @creator = Creator.find(get_auth_user_data["id"])  
    @creator.destroy
    
    render json:{message: "The creator was destroyed"}, status: :ok
  end

  def update
    @creator = Creator.find(get_auth_user_data["id"])  
    
    @creator.update(creator_params)
    @creator.save
    
    render json:{message: "The creator was updated"}, status: :ok
  end
  
  private 
  
  def creator_params
    params.require(:creator).permit(:userName, :email, :password, :password_confirmation)
  end

  
end
