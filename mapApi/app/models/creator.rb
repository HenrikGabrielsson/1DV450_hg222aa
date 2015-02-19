class Creator < ActiveRecord::Base

  has_secure_password validations: false
  
  #email sparas alltid som downcase
  before_save { self.email = email.downcase }
  
  validates :userName, 
  presence: {message: "Du måste skriva ett användarnamn."},
  uniqueness: {message: "Detta användarnamn är redan upptagen."},
  length: {maximum: 100, message: "Användarnamnet får inte vara mer än 100 tecken långt."}
  
  validates :email, 
  presence: {message: "Du måste skriva en e-mailadress."},
  uniqueness: {message: "Denna e-mailadress är redan upptagen."},
  email_format: { message: "Du måste skriva en riktig e-mailadress" }
  
  validates :password,
  length: {minimum: 6, message: "Lösenordet måste vara minst 6 tecken långt."},
  confirmation: {message: "Lösenorden matchade inte."}

  has_many :memories
end
