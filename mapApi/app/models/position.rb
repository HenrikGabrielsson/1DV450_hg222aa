class Position < ActiveRecord::Base
  validates :longitude, 
  presence: {message: "Det måste finnas en longitud."},
  numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0, message: "Longitud måste ligga mellan -180 och 180." }

  validates :latitude, 
  presence: {message: "Det måste finnas en latitud."},
  numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0, message: "Latitud måste ligga mellan -90 och 90." }
  
  has_and_belongs_to_many :memories
end
