class Memory < ActiveRecord::Base
    
  validates :title, 
  presence: {message: "Du måste skriva en titel"},
  length: { maximum: 100, message: "Titeln får inte vara längre än 100 tecken." }
  
  validates :eventDate,
  presence: {message: "Du måste berätta när det inträffade."}
  
  validates :memoryText,
  presence: {message: "Du måste skriva ner minnet också."},
  length: { maximum: 400, message: "Minnet får inte vara längre än 400 tecken." }
  
  belongs_to :creator
  belongs_to :position
  has_and_belongs_to_many :tags

end
