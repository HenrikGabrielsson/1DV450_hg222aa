class KeysController < ApplicationController
  include KeysHelper
  
  before_action :check_login
  def show 
    @key = User.find(session[:userId]).key      
  end
  
  def destroy
    key = Key.find(params[:key])
    key.destroy
    
    redirect_to root_path
  end
end
