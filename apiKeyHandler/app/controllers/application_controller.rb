class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  include ApplicationHelper
    
  around_filter :catch_not_found

  private

  #om ett objekt inte hittas skickas man till root.
  def catch_not_found
    yield
  rescue ActiveRecord::RecordNotFound
    flash[:notice] = "Hittades inte"
    redirect_to root_url
  end
end
