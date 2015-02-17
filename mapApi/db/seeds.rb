# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(userName: "henrik", email: "test@test.se", password: "password", password_confirmation:"password")
User.create(userName: "henrik2", email: "test@test2.se", password: "password", password_confirmation:"password")
