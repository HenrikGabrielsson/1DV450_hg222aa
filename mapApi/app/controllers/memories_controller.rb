class MemoriesController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_token, only: [:create, :destroy, :update]
  before_action :authenticate_api_key
  
  def index
    
    #creators/{id}/memories
    if params[:creator_id].present?
      @memories = Creator.find(params[:creator_id]).memories
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
    @position = Position.new(longitude: params[:longitude], latitude: params[:latitude])

    if @position.save 
          
      @memory.position = @position
      @memory.creator_id = get_auth_user_data["id"]

      if @memory.save
        respond_with @memory
      end
    end
  end
  
  def update
    
    @memory = Memory.find(params[:id])  

    if @memory.creator_id.to_s == get_auth_user_data["id"]
      
      @memory.update(memory_params)
      @memory.save
      respond_with status: :no_content
    else
      render json: { error: 'Du får inte ändra detta minne.' }, status: :bad_request
    
    end

  end
  
  def destroy
  end
  
  
  private 
  
  def memory_params
    params.require(:memory).permit(:title, :eventDate, :memoryText)
  end
  
end