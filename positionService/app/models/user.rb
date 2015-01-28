class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :appSite, presence: true
  validates :appDescription, presence: true
  validates :password_digest, presence: true
  
  has_one :key 
  
  has_secure_password
end
