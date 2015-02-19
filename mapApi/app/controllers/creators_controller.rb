class CreatorsController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_token, only: [:show]
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
      respond_with @creator, except: [:password_digest]
    end    
  end

  def destroy
  end

  def update
  end
  
  private 
  
  def creator_params
    params.require(:creator).permit(:userName, :email)
  end

  
end
