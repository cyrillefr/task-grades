class CreateTables < ActiveRecord::Migration
   
   def change

         create_table :student do |t|
            t.string :first_name
            t.string :last_name
        end 

        create_table :course do |t|
            t.string :number
            t.string :name
        end

         create_table :course_student, id: false do |t|
            t.belongs_to :student
            t.belongs_to :course
        end

        add_index :course_student, [:student_id, :course_id], :unique => true

        create_table :test do |t|
            t.belongs_to :course, index: true
            t.string :name
            t.datetime :date_scheduled, null: true
        end

        create_table :test_grade do |t|
            t.belongs_to :test, index: true
            t.belongs_to :student, index: true
            t.string :note
        end

        add_index :test_grade, [:test_id, :student_id], :unique => true

    end 

end
