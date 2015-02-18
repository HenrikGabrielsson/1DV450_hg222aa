class User < ActiveRecord::Base
  
  has_secure_password validations: false 
  
  #email sparas alltid som downcase
  before_save { self.email = email.downcase }
  
  validates :email, 
      presence: {message: "Du måste skriva en e-mailadress."},
      uniqueness: {message: "Denna e-mailadress är redan upptagen."},
      email_format: { message: "Du måste skriva en riktig e-mailadress" }

  validates :appSite, 
      presence: {message: "Du måste skriva URL:en till din applikation."},
      length: {maximum: 200, message: "URL:en får inte vara längre än 200 tecken"}
  
  validates :appDescription,
      presence: {message: "Beskriv din applikation."},
      length: {maximum: 1000, message: "Beskrivningen får inte vara längre än 1000 tecken"}
      
  validates :password,
      length: {minimum: 6, message: "Lösenordet måste vara minst 6 tecken långt."},
      confirmation: {message: "Lösenorden matchade inte."}
  
  has_one :key 
  
  
end
