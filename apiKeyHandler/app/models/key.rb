class Key < ActiveRecord::Base
  before_create :generate_new_key 
  validate :key, uniqueness: true
  
  belongs_to :user 
  
  def generate_new_key   
    random = ""
    loop do
      random = SecureRandom.urlsafe_base64(25)
      break if (Key.exists?(key: random) == false)
    end  
    self.key = random
  end
  
end
