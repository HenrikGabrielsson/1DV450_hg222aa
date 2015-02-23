class MemoriesController < ApplicationController
  respond_to :json

  before_action :authenticate_api_key
  before_action :authenticate_api_token, only: [:create, :destroy, :update]
  
  def index 
    #creators/{id}/memories
    if params[:creator_id].present?
      @memories = Creator.find(params[:creator_id]).memories
    elsif params[:tag_id].present?
      @memories = Tag.find(params[:tag_id]).memories
    else
      @memories = Memory.all
    end

    respond_with @memories.sort_by {|m| m.updated_at}
  end
  
  def show
    
    @memory = Memory.find(params[:id])
    respond_with @memory
  end
  
  def create
    @memory = Memory.new(memory_params)

    @memory.creator_id = get_auth_user_data["id"]

    if @memory.save
      respond_with @memory
    end
  end
  
  def update
    @memory = Memory.find(params[:id].to_i)
    @creator = @memory.creator
    
    if get_auth_user_data["id"].to_i == @creator.id

      @memory.update(memory_params)
      @memory.save

      render json:{message: "Minnet uppdaterades"}, status: :ok
    else
      render json:{error: "Du får inte ändra detta minne"}, status: :forbidden
    end

  end
  
  def destroy
    @memory = Memory.find(params[:id].to_i)
    @creator = @memory.creator
    
    if get_auth_user_data["id"].to_i == @creator.id

      @memory.destroy

      render json:{message: "Minnet togs bort"}, status: :ok
    else
      render json:{error: "Du får inte ta bort detta minne"}, status: :forbidden
    end
  end
  
  def findnear
    @range = params[:range]
    
    if params.has_key?(:location)
      @location = params[:location]
    else 
      @location = [params[:lat].to_f, params[:long].to_f]
    end
    
    @memories = Memory.near(@location, @range)
    
    respond_with @memories
    
  end
  
  private 
  
  def memory_params
    params.require(:memory).permit(:title, :eventDate, :memoryText, :longitude, :latitude, tags_attributes: [:tag])
  end
  
end