module Read
    
    def get_student_by_id(id)
        Student.find(id)
    end


    def get_students (limit_value, offset_value)
        Student.limit(limit_value).offset(offset_value)
    end


    def get_students_count 
        Student.count
    end


    def get_students_by_course (course_id, limit_value, offset_value)
        course = Course.find(course_id)
        course.student.limit(limit_value).offset(offset_value)
    end

    def get_total_students_by_course(course_id) 
        course = Course.find(course_id)
        course.student.size
    end

    def list_of_courses (limit_value, offset_value)
        Course.limit(limit_value).offset(offset_value) 
    end


    def student_detail_courses (student_id)
        sql_request = "SELECT c.*, CASE (select student_id from course_student where c.id = course_id and student_id = "\
         "?) WHEN ? THEN 'Y' ELSE 'N' END as take_course from course c;"
        Course.find_by_sql [sql_request, student_id, student_id]
    end


    def list_of_courses (limit_value, offset_value)
        courseList = Course.limit(limit_value).offset(offset_value)
        courseCount = Course.count
        {"records": courseList, "count": courseCount}.to_json
    end


    def list_of_tests (limit_value, offset_value) 
        testList = Test.select("test.id, course_id, test.name as name, course.name as course_name").joins(:course).limit(limit_value).offset(offset_value)
        testCount = Test.count
        {"records": testList, "count": testCount}.to_json
    end


    def get_test_detail (test_id) 
        testDetail = Test.select("*, course.name as course_name, test.name as test_name").joins(:course).where('test.id = ?', test_id)
        (JSON.parse(testDetail.to_json))[0]
    end

    def get_students_grades(test_id)
        testGradesDetail = Student.select("*, test_grade.note as grade").joins(:test_grade).where('test_grade.test_id = ?', test_id)
        (JSON.parse(testGradesDetail.to_json))
    end

end
