class Memory < ActiveRecord::Base
   
  include Rails.application.routes.url_helpers
  
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

  #used to decide what to display when responded with
  def serializable_hash (options={})
    options = {
      include: [:tags],
      methods: [:url, :creator_info]
      
    }.update(options)

    super(options)
  end  
  
  #url to the object
  def url
    "#{Rails.configuration.baseurl}#{memory_path(self)}"
  end

  #some info about the owner of the memory
  def creator_info
    creator = self.creator
    {
      :userName => creator.userName,
      :id => creator.id,
      :link => "#{Rails.configuration.baseurl}#{creator_path(creator)}"
    }
  end
    
  
  private

  #called when adding tags to avoid duplicate tags to be created
  def tag_exists(tag_attributes)
    if Tag.find_by(tag: tag_attributes['tag'])

      #add old tag to tags-collection and avoid creating new one
      self.tags << Tag.find_by(tag: tag_attributes['tag'])
      return true
    end
    return false
  end

end
