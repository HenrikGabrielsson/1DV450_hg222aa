# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150216211241) do

  create_table "admins", force: :cascade do |t|
    t.string   "userName",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "creators", force: :cascade do |t|
    t.string   "userName",        limit: 100, null: false
    t.string   "email",                       null: false
    t.string   "password_digest",             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "keys", force: :cascade do |t|
    t.string   "key"
    t.integer  "callCount",  default: 0, null: false
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "memories", force: :cascade do |t|
    t.string   "title",       limit: 100, null: false
    t.datetime "eventDate",               null: false
    t.text     "memoryText",  limit: 400, null: false
    t.integer  "creator_id"
    t.integer  "position_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "memories_tags", id: false, force: :cascade do |t|
    t.integer "memory_id", null: false
    t.integer "tag_id",    null: false
  end

  add_index "memories_tags", ["memory_id"], name: "index_memories_tags_on_memory_id"
  add_index "memories_tags", ["tag_id"], name: "index_memories_tags_on_tag_id"

  create_table "positions", force: :cascade do |t|
    t.decimal  "latitude",   precision: 7, scale: 4, null: false
    t.decimal  "longitude",  precision: 7, scale: 4, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: :cascade do |t|
    t.string   "tag",        limit: 50, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "appSite",         null: false
    t.text     "appDescription",  null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
