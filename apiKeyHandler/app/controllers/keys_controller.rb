class KeysController < ApplicationController
  
  #kollar hur man är inloggad innan nåt görs
  before_action :authenticate_user, only: [:show]
  before_action :authenticate_admin, only: [:index]
  
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
  
  private 
  
  #kollar så man är inloggad som user. Annars redirect till startsida
  def authenticate_user
    if get_user_id.nil?
      flash[:notice] = "Du måste vara inloggad först."
      redirect_to root_path
    end  
  end
  
  #kollar så man är inloggad som admin. Annars redirect till startsida
  def authenticate_admin
    if get_admin_id.nil?
      flash[:notice] = "Du måste vara inloggad som administratör först."
      redirect_to root_path
    end
  end
  
end
