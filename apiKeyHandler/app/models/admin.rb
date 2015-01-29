class Admin < ActiveRecord::Base
  has_secure_password
  
  validate :userName, presence: true, uniqueness: true
  validate :password, presence: true
  
end
