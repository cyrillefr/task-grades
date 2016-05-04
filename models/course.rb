class Course < ActiveRecord::Base
    self.pluralize_table_names = false

    has_and_belongs_to_many :student
    has_many :test, dependent: :destroy

    validates :number, :presence => {:message => 'Course number cannot be blank, Task not saved'}
    validates :name, :presence => {:message => 'Course name cannot be blank, Task not saved'}
end