class TagsController < ApplicationController
  respond_to :json

  before_action :authenticate_api_key
  
  def index
    @tags = Tag.all
    respond_with @tags
  end
  
  def show
    @tag = Tag.find(params[:id])
    respond_with @tag
  end
  
  def create
    @tag = Tag.new(tag_params)
    
    if $tag.save
      respond_with @tag
    end
  end
  
  def update
  end
  
  def destroy
  end
  
  private 
  
  def tag_params
    params.require(:tag).permit(:tag)
  end
  
end
