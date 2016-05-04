class Student < ActiveRecord::Base
    self.pluralize_table_names = false

    has_and_belongs_to_many :course
    has_many :test_grade

    #messages are in locales
    validates :first_name, :presence => true
    validates :last_name, :presence => true

end