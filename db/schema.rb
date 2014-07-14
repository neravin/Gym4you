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

ActiveRecord::Schema.define(version: 20140526235846) do

  create_table "affiliates", force: true do |t|
    t.string   "address"
    t.string   "phone"
    t.integer  "gymnasium_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "city"
  end

  add_index "affiliates", ["gymnasium_id"], name: "index_affiliates_on_gymnasium_id"

  create_table "affiliates_prices", id: false, force: true do |t|
    t.integer "affiliate_id", null: false
    t.integer "price_id",     null: false
  end

  add_index "affiliates_prices", ["affiliate_id"], name: "index_affiliates_prices_on_affiliate_id"
  add_index "affiliates_prices", ["price_id"], name: "index_affiliates_prices_on_price_id"

  create_table "affiliates_services", id: false, force: true do |t|
    t.integer "affiliate_id", null: false
    t.integer "service_id",   null: false
  end

  add_index "affiliates_services", ["affiliate_id"], name: "index_affiliates_services_on_affiliate_id"
  add_index "affiliates_services", ["service_id"], name: "index_affiliates_services_on_service_id"

  create_table "gymnasia", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "logo_url"
    t.string   "phone_overall"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "site"
  end

  create_table "prices", force: true do |t|
    t.decimal  "number_months"
    t.decimal  "price",         precision: 8, scale: 2
    t.text     "terms"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "gymnasium_id"
  end

  add_index "prices", ["gymnasium_id"], name: "index_prices_on_gymnasium_id"

  create_table "services", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
