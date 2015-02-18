class PositionsController < ApplicationController
  respond_to :json, :xml
  
  before_action :authenticate_api_key
   
  def index
    @positions = Position.all
    respond_with @positions
  end
  
  def show
    @position = Position.find(params[:id])
  end
  
  def create
    @position = Position.new(position_params)
    
    if $position.save
      respond_with @position
    end
  end
  
  def update
  end
  
  def destroy
  end
  
  private 
  
  def tag_params
    params.require(:position).permit(:latitude, :longitude)
  end
  
end
