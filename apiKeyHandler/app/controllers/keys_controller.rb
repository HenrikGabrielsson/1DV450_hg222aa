class KeysController < ApplicationController
  include KeysHelper
  
  
  before_action :check_login, only: [:show]
  before_action :check_admin_login, only: [:index]
  
  def index
    @keys = Key.all
  end
  
  def show 
    @key = User.find(session[:userId]).key      
  end
  
  def destroy
    key = Key.find(params[:id])
    key.destroy
    
    redirect_to(:back)
  end
end
