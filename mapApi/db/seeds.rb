# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


#API
Creator.create(userName: "henrik", email: "test@test.se", password: "password", password_confirmation: "password")
Creator.create(userName: "henrik2", email: "test@test2.se", password: "password", password_confirmation: "password")

Memory.create(title: "Birthday", memoryText: "Good times...", eventDate: Date.parse('31-10-2010'))
Memory.create(title: "Wedding", memoryText: "Good times...", eventDate: Date.parse('31-12-2010')) 
Memory.create(title: "Funeral", memoryText: "Bad times...", eventDate: Date.parse('30-11-2010')) 

Tag.create(tag: "fun")
Tag.create(tag: "sucks")


#KeyReg
Admin.create(userName: "admin", password: "password", password_confirmation: "password")

User.create(email: "henrik@test.se", password: "password", password_confirmation: "password", appSite: "www.henrik.se", appDescription: "bla bla bla", key: Key.create)
User.create(email: "random@user.se", password: "password", password_confirmation: "password", appSite: "www.random.se", appDescription: "such random", key: Key.create)

