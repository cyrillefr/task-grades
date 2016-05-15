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

ActiveRecord::Schema.define(version: 20160515193631) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "course", force: :cascade do |t|
    t.string "number"
    t.string "name"
  end

  create_table "course_student", id: false, force: :cascade do |t|
    t.integer "student_id"
    t.integer "course_id"
  end

  add_index "course_student", ["student_id", "course_id"], name: "index_course_student_on_student_id_and_course_id", unique: true, using: :btree

  create_table "student", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
  end

  create_table "test", force: :cascade do |t|
    t.integer  "course_id"
    t.string   "name"
    t.datetime "date_scheduled"
  end

  add_index "test", ["course_id"], name: "index_test_on_course_id", using: :btree

  create_table "test_grade", force: :cascade do |t|
    t.integer "test_id"
    t.integer "student_id"
    t.string  "note"
  end

  add_index "test_grade", ["student_id"], name: "index_test_grade_on_student_id", using: :btree
  add_index "test_grade", ["test_id", "student_id"], name: "index_test_grade_on_test_id_and_student_id", unique: true, using: :btree
  add_index "test_grade", ["test_id"], name: "index_test_grade_on_test_id", using: :btree

end
