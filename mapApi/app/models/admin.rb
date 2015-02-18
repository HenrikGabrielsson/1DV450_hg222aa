class Admin < ActiveRecord::Base
  has_secure_password
  
  validates :userName, presence: true, uniqueness: true
  validates :password, presence: true

end
