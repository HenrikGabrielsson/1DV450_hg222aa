class KeyController < ApplicationController
  def show 
    
    if session[:userId] != nil    
      @user = User.find(session[:userId])      

    else
      redirect_to root_path
      return false
    end

    if Key.exists?(user_id: @user.id) == false
      @key = Key.new
      @key.generate_new_key

      @user.key = @key
      @key.save
    end

      
  end


end
