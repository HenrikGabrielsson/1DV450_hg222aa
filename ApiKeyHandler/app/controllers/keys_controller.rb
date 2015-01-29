class KeysController < ApplicationController
  
  def show 
    
    if session[:userId] != nil    
      @user = User.find(session[:userId])      

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
