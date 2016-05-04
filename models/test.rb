class Test < ActiveRecord::Base
    self.pluralize_table_names = false

    belongs_to :course
    has_many :test_grade

    validates :name, :presence => {:message => 'Test name cannot be blank, Task not saved'}
end