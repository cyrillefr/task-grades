class TestGrade < ActiveRecord::Base
    self.pluralize_table_names = false

    belongs_to :test
    belongs_to :student
end