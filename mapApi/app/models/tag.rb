class Tag < ActiveRecord::Base

  include Rails.application.routes.url_helpers
  
  validates :tag, 
  presence: {message: "Du måste skriva en text i taggen"},
  length: { maximum: 50, message: "Taggen får inte vara längre än 50 tecken." }
  
  has_and_belongs_to_many :memories
  
  #used to decide what to display when responded with
  def serializable_hash (options={})
    options = {
      only: [:tag, :id],
      methods: [:url]
      
    }.update(options)

    super(options)
  end  
  
  #url to the object
  def url
    "#{Rails.configuration.baseurl}#{tag_path(self)}"
  end
  
end
