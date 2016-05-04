require "models/student"
require "commands/update"

module Create


    def create_student(data)

        student = Student.new :first_name => data['first_name'], :last_name => data['last_name']
        #First, is student update will be ok ?
        return student.errors.messages.to_json unless student.valid?
        student.save


        #Then, proceed to association
        if data['courses'].is_a? NilClass
            return true
        else
            associate_student_courses student, data['courses']      
        end

    end

    def create_course(number, name)
        course = Course.new :number => number, :name => name
        return course.errors.messages.to_json unless course.valid?
        course.save
    end

    def create_test(data) 

        return  t :no_data_to_proceed, :scope => 'custom.errors.custom' if data.empty?

        return  t :not_enough_data_to_proceed, :scope => 'custom.errors.custom' if (data.has_key?('test_name') == false || data.has_key?('course_id') == false || data.has_key?('grades') == false )

        test = Test.new :name => data['test_name'], :course_id => data['course_id']
        return test.errors.messages.to_json unless test.valid?
        test.save

        data['grades'].each do |grade|
            test_grade = TestGrade.new do |tg|
                tg.test = test
                tg.student = Student.find(grade['id'])
                tg.note = grade['grade']
            end
            test_grade.save
        end

        return true

    end

end


