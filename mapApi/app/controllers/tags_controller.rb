class TagsController < ApplicationController
  respond_to :json

  before_action :pagination, only: [:index]
  before_action :authenticate_api_key
  
  skip_around_action :catch_not_found
  
  #/tags
  def index
    respond_with Tag.limit(@limit).offset(@offset)
  end
  
  #/tags/{id}
  def show
    tag = Tag.find_by_id(params[:id])
    
    if tag.present?
      respond_with tag
    else
      render json:{error:"Ingen tagg med detta id hittades"},status: :not_found
    end
  end

  private 

  #strong params
  def tag_params
    params.require(:tag).permit(:tag)
  end
  
end
