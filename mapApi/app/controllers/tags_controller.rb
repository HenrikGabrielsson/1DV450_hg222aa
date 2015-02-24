class TagsController < ApplicationController
  respond_to :json

  before_action :pagination, only: [:index]
  before_action :authenticate_api_key
  
  #/tags
  def index
    @tags = Tag.all
    respond_with @tags.limit(@limit).offset(@offset)
  end
  
  #/tags/{id}
  def show
    @tag = Tag.find(params[:id])
    respond_with @tag
  end

  private 

  #strong params
  def tag_params
    params.require(:tag).permit(:tag)
  end
  
end
