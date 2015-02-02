class KeysController < ApplicationController
  include KeysHelper
  
  #kollar hur man är inloggad innan nåt görs
  before_action :check_login, only: [:show]
  before_action :check_admin_login, only: [:index]
  
  #visar alla nycklar för en admin
  def index
    @keys = Key.all
  end
  
  #Visar en nyckel för inloggad användare
  def show 
    
    #kollar så nyckeln finns och att det är den inloggade användarens nyckel
    if Key.find_by_id(params[:id]) && get_user_id == Key.find(params[:id]).user.id
      @key = Key.find(params[:id])
    else
      flash[:notice] = "Du får inte se denna nyckel"
      redirect_to root_path
    end
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
