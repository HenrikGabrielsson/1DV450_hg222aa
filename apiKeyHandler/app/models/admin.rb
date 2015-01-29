class Admin < ActiveRecord::Base
  has_secure_password
  
  validate :userName, presence: true, uniqueness: true
  validate :password_digest, presence: true
  validate :salt, presence: true
  
end
