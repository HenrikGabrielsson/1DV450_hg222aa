class Tag < ActiveRecord::Base
  
  validates :tag, 
  presence: {message: "Du måste skriva en text i taggen"},
  length: { maximum: 50, message: "Taggen får inte vara längre än 50 tecken." }
  
  has_and_belongs_to_many :memories
end
