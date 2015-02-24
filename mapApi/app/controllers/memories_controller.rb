class MemoriesController < ApplicationController
  respond_to :json

  before_action :pagination, only:[:index, :findnear]
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

    respond_with @memories.limit(@limit).offset(@offset).sort_by {|m| m.updated_at}
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
  
  def search
    @memories = Memory.where("title LIKE ?", "%"+params[:term]+"%")
    
    respond_with @memories.limit(@limit).offset(@offset)
  end
  
  def findnear
    @range = params[:range]
    
    if params.has_key?(:location)
      @memories = Memory.near(params[:location], @range, :units => :km)
    else  
      @memories = Memory.near([params[:lat].to_f, params[:long].to_f], @range, :units => :km)
    end

    respond_with @memories.limit(@limit).offset(@offset)
    
  end
  
  private 
  
  def memory_params
    params.require(:memory).permit(:title, :eventDate, :memoryText, :longitude, :latitude, tags_attributes: [:tag])
  end
  
end