require "models/student"

module Delete

    def  delete_student(id)
        begin
            student = Student.find(id)
            student.destroy
            return true    
        rescue
            t :tried_delete_unknown_student, :scope => 'custom.errors.custom'
        end
    end

    def delete_course(id)
        begin
            course = Course.find(id)
            course.destroy      
            return true
        rescue
            t :tried_delete_unknown_course, :scope => 'custom.errors.custom'
        end
    end

    def delete_test(id)
        begin
            test = Test.find(id)
            test.destroy      
            return true
        rescue
            t :tried_delete_unknown_test, :scope => 'custom.errors.custom'
        end
    end


end