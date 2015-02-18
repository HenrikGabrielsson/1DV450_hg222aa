class CreatorsController < ApplicationController
  respond_to :json, :xml
  
  def index
    @creators = Creator.all
    respond_with @creators
  end

  def show
    @creator = Creator.find(params[:id])
    respond_with @creator
  end
  
  def create 
    @creator = Creator.new(creator_params)
    
    #om det går att spara.
    if @creator.save
      respond_with @creator
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
