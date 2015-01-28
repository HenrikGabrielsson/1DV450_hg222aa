class Admin < ActiveRecord::Base
  validate :userName, presence: true, uniqueness: true
  validate :password, presence: true
  validate :salt, presence: true
  
  has_secure_password
end
