class Key < ActiveRecord::Base
  before_create :generate_new_key 
  validate :key, uniqueness: true
  
  belongs_to :user 
  
  #generar en slumpmässig, unik nyckel.
  def generate_new_key   
    random = ""
    loop do
      random = SecureRandom.urlsafe_base64(25)
      break if Key.find_by_key(random) == nil #nyckel måste var unik.
    end  
    self.key = random
  end
  
end
