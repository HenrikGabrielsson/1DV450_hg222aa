class MemoriesController < ApplicationController
  respond_to :json

  before_action :pagination, only:[:index, :findnear]
  before_action :authenticate_api_key
  before_action :authenticate_api_token, only: [:create, :destroy, :update]
  
  skip_around_action :catch_not_found
  
  #/memories
  def index 
    #/creators/{id}/memories
    if params[:creator_id].present?
      memories = Creator.find_by_id(params[:creator_id]).memories
    
    #/tags/{id}/memories
    elsif params[:tag_id].present?
      memories = Tag.find_by_id(params[:tag_id]).memories
      
    #/memories  
    else
      memories = Memory.all
    end

    #sorted by last update
    respond_with memories.limit(@limit).offset(@offset).sort_by {|m| m.updated_at}
  end
  
  #/memories/{id}
  def show
    
    memory = Memory.find_by_id(params[:id])
    
    if memory.present?
      respond_with memory, status: :ok
    else
      render json:{error:"Det finns inget minne med detta id"}, status: :not_found
    end
    
  end
  
  #creates memory with tags 
  def create
    memory = Memory.new(memory_params)

    #logged in creator
    memory.creator_id = get_auth_user_data["id"]

    if memory.save
      respond_with memory
    end
  end
  
  #updates memory and tags
  #needs to send all tags along everytime!
  def update

    memory = Memory.find_by_id(params[:id].to_i)

    #removes all tags to avoid duplication
    memory.tags.delete_all
    
    creator = memory.creator
    
    #check that user is authorized to update memory
    if get_auth_user_data["id"].to_i == creator.id

      memory.update(memory_params)
      memory.save

      render json:{message: "Minnet uppdaterades"}, status: :ok
    else
      render json:{error: "Du får inte ändra detta minne"}, status: :forbidden
    end

  end
  
  #delete memory, keep tags.
  def destroy
    memory = Memory.find(params[:id].to_i)
    creator = memory.creator
    
    if get_auth_user_data["id"].to_i == creator.id

      memory.destroy

      render json:{message: "Minnet togs bort"}, status: :ok
    else
      render json:{error: "Du får inte ta bort detta minne"}, status: :forbidden
    end
  end
  
  #search for string in memory.title (/memories?search=term)
  def search
    memories = Memory.where("title LIKE ?", "%"+params[:term]+"%")
    
    respond_with memories.limit(@limit).offset(@offset)
  end
  
  #finds memories within given range of given location (string or lat,long)
  def findnear
    range = params[:range]
    
    #search by string
    if params.has_key?(:location)
      memories = Memory.near(params[:location], range, :units => :km)
      #search by lat,long
    else  
      memories = Memory.near([params[:lat].to_f, params[:long].to_f], range, :units => :km)
    end

    respond_with memories.limit(@limit).offset(@offset)
    
  end
  
  private 
  
  #strong params
  #also takes an array of tags to create/add to memory
  def memory_params
    params.require(:memory).permit(:title, :eventDate, :memoryText, :longitude, :latitude, tags_attributes: [:tag])
  end
  
end