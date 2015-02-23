class Memory < ActiveRecord::Base
    
  reverse_geocoded_by :latitude, :longitude
  
  validates :title, 
  presence: {message: "Du måste skriva en titel"},
  length: { maximum: 100, message: "Titeln får inte vara längre än 100 tecken." }
  
  validates :eventDate,
  presence: {message: "Du måste berätta när det inträffade."}
  
  validates :memoryText,
  presence: {message: "Du måste skriva ner minnet också."},
  length: { maximum: 400, message: "Minnet får inte vara längre än 400 tecken." }
  
  validates :longitude, 
  presence: {message: "Det måste finnas en longitud."},
  numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0, message: "Longitud måste ligga mellan -180 och 180." }

  validates :latitude, 
  presence: {message: "Det måste finnas en latitud."},
  numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0, message: "Latitud måste ligga mellan -90 och 90." }
  
  belongs_to :creator
  has_and_belongs_to_many :tags
  accepts_nested_attributes_for :tags, :reject_if => :tag_exists

  private

  def tag_exists(tag_attributes)
    if Tag.find_by(tag: tag_attributes['tag'])
        self.tags << Tag.find_by(tag: tag_attributes['tag'])
        return true
      end
      return false
    end

end
