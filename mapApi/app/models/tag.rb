class Tag < ActiveRecord::Base

  include Rails.application.routes.url_helpers
  
  validates :tag, 
  presence: {message: "Du måste skriva en text i taggen"},
  length: { maximum: 50, message: "Taggen får inte vara längre än 50 tecken." }
  
  has_and_belongs_to_many :memories
  
  def serializable_hash (options={})
    options = {
      only: [:tag],
      methods: [:url]
      
    }.update(options)

    

    super(options)
  end  
  
  def url
    "#{Rails.configuration.baseurl}#{tag_path(self)}"
  end
  
end
