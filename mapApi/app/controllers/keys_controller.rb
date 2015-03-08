class KeysController < ApplicationController
  
  #kollar hur man är inloggad innan nåt görs
  before_filter -> { authenticate_user Key.find(params[:id]).user.id}, only: [:show]
  before_action :authenticate_admin, only: [:index]

  #no csrf-crap for api!!
  skip_before_filter  :verify_authenticity_token  
  
  #visar alla nycklar för en admin
  def index
    @keys = Key.all
  end
  
  #Visar en nyckel för inloggad användare
  def show 
    @key = Key.find(params[:id])
  end
  
  #tar bort en nyckel
  def destroy
    key = Key.find(params[:id])
    
    #kollar behörighet för att ta bort nyckel.
    if get_user_id == key.user.id || session[:adminId]
      key.destroy
    end

    redirect_to(:back)
  end

end
