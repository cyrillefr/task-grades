require "models/student"
require "models/course"

module Update

    def update_student_details(data)

        student = Student.find(data['id']) 
        student.first_name = data['first_name']
        student.last_name = data['last_name']

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


    def associate_student_courses(student, courses)
        begin
            array_of_courses = courses.map { |hash_param| Course.find hash_param['id'] }
            student.course=(array_of_courses)
            return true
        rescue =>e
            puts e.message
            puts e.backtrace
            return false
        end
    end

    def update_course(data)
        course = Course.find(data['id']) 
        course.number = data['number']
        course.name = data['name']

        return course.errors.messages.to_json unless course.valid?
        course.save
    end

    def update_test_details (data)
        return  t :no_data_to_proceed, :scope => 'custom.errors.custom' if data.empty?
        return t :not_enough_data_to_proceed, :scope => 'custom.errors.custom' if (data.has_key?('grades') == false)

        data['grades'].each do |grade|
            test_grade = TestGrade.where("test_id = ? and student_id = ?", grade['test_id'], grade['student_id']).take
            test_grade.note = grade['grade']
            test_grade.save
        end

        return true

    end

end

