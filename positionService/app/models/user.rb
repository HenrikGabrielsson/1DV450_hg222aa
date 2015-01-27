class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :appSite, presence: true
  validates :appDescription, presence: true
  
  validates :password, presence: true
  validates :salt, presence: true
  
  has_one :key 
end
