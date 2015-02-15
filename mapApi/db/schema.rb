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

ActiveRecord::Schema.define(version: 20150215113015) do

  create_table "memories", force: :cascade do |t|
    t.string   "title",      limit: 100, null: false
    t.datetime "eventDate",              null: false
    t.datetime "createDate",             null: false
    t.text     "memoryText", limit: 300, null: false
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "memories_positions", id: false, force: :cascade do |t|
    t.integer "memory_id",   null: false
    t.integer "position_id", null: false
  end

  add_index "memories_positions", ["memory_id"], name: "index_memories_positions_on_memory_id"
  add_index "memories_positions", ["position_id"], name: "index_memories_positions_on_position_id"

  create_table "positions", force: :cascade do |t|
    t.decimal  "latitude",   precision: 7, scale: 4, null: false
    t.decimal  "longitude",  precision: 7, scale: 4, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: :cascade do |t|
    t.string   "tag",        limit: 50, null: false
    t.integer  "memory_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "userName",        limit: 100, null: false
    t.string   "email",                       null: false
    t.string   "password_digest",             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
