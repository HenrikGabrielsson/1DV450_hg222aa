class User < ActiveRecord::Base
  
  has_secure_password
  
  validates :email, presence: true, uniqueness: true
  validates :appSite, presence: true
  validates :appDescription, presence: true
  validates :password, presence: true
  validates :password_confirmation, presence: true
  
  has_one :key 
  
  
end
