# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


#API
Creator.create(id: 1, userName: "henrik", email: "henrik@test.se", password: "password", password_confirmation: "password")
Creator.create(id: 2, userName: "henrik2", email: "henrik@test2.se", password: "password", password_confirmation: "password")
Creator.create(id: 3, userName: "tester", email: "test@test2.se", password: "password", password_confirmation: "password")

Tag.create(id: 1, tag: "fun")
Tag.create(id: 2, tag: "sucks")
Tag.create(id: 3, tag: "bowling")
Tag.create(id: 4, tag: "water")
Tag.create(id: 5, tag: "death")
Tag.create(id: 6, tag: "life")
Tag.create(id: 7, tag: "beach")

Memory.create(title: "Birthday", memoryText: "Hello, world!", eventDate: Date.parse('31-10-1930'), longitude: 1, latitude: 1, creator_id: 2, tags:[Tag.find(1), Tag.find(6)])
Memory.create(title: "Wedding", memoryText: "Sand everywhere", eventDate: Date.parse('04-10-1960'), longitude: 8, latitude: 25, creator_id: 2, tags:[Tag.find(1)])
Memory.create(title: "Funeral", memoryText: "...", eventDate: Date.parse('30-11-2010'), longitude: 16.20, latitude: 56.40, creator_id: 2, tags:[Tag.find(2), Tag.find(5)])
Memory.create(title: "Swimming", memoryText: "I went swimming and almost got eaten by a shark.", longitude: 16.24, latitude: 56.38, creator_id:1, tags:[Tag.find(1), Tag.find(4),Tag.find(7)])

#KeyReg
Admin.create(userName: "admin", password: "password", password_confirmation: "password")

#fusknyckel
k = Key.create
k.key = "testkey"
k.save


User.create(email: "henrik@test.se", password: "password", password_confirmation: "password", appSite: "www.henrik.se", appDescription: "bla bla bla", key: k)
User.create(email: "random@user.se", password: "password", password_confirmation: "password", appSite: "www.random.se", appDescription: "such random", key: Key.create)


