class KeyController < ApplicationController
  def show 
    @user = User.find(session[:userId])
    
    if Key.exists?(user_id: @user.id) == false
      @key = Key.new
      @key.generate_new_key
      
      @user.key = @key
      
      @user.save
      @key.save
    end
    
  end
end
