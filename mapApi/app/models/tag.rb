class Tag < ActiveRecord::Base
  
  before_create :avoid_duplication
  
  validates :tag, 
  presence: {message: "Du måste skriva en text i taggen"},
  length: { maximum: 50, message: "Taggen får inte vara längre än 50 tecken." }
  
  has_and_belongs_to_many :memories
  
  private 
  
  def avoid_duplication
    if Tag.find_by(tag: self.tag)
      puts "test"
      puts self.memories
      puts "test2"
      
    end
  end
  
end
