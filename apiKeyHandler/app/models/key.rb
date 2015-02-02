class Key < ActiveRecord::Base
  before_create :generate_new_key 
  validate :key, uniqueness: true
  
  belongs_to :user 
  
  def generate_new_key   
    random = ""
    loop do
      random = SecureRandom.urlsafe_base64(25)
      break if Key.find_by_key(random) == nil
    end  
    self.key = random
  end
  
end
