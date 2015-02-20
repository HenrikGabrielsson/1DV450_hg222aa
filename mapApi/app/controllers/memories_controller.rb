class MemoriesController < ApplicationController
  respond_to :json
  
  before_action :authenticate_api_key
  
  def index
    @memories = Memory.all
    respond_with @memories.sort_by {|m| m.updated_at}
  end
  
  def show
    @memory = Memory.find(params[:id])
    respond_with @memory
  end
  
  def create
    @memory = Memory.new(memory_params)
    
    if @memory.save
      respond_with @memory
    end
  end
  
  def update
  end
  
  def destroy
  end
  
  
  private 
  
  def memory_params
    params.require(:memory).permit(:title, :eventDate, :memoryText)
  end
  
end