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

ActiveRecord::Schema.define(version: 20140331200238) do

  create_table "affiliates", force: true do |t|
    t.string   "address"
    t.decimal  "price",        precision: 8, scale: 2
    t.string   "phone"
    t.integer  "gymnasium_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
  end

  add_index "affiliates", ["gymnasium_id"], name: "index_affiliates_on_gymnasium_id"

  create_table "gymnasia", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "logo_url"
    t.string   "phone_overall"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
