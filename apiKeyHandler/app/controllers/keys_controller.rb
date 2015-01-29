class KeysController < ApplicationController
  before_action: check_login
  def show 
    
    if session[:userId] != nil    
      @key = User.find(session[:userId]).key      

    else
      redirect_to root_path
      return false
    end

  end
  
  def destroy
    key = Key.find(params[:key])
    key.destroy
    
    redirect_to root_path
  end


end
