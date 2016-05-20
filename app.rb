$:.unshift File.dirname(__FILE__)

require "sinatra/base"
require "sinatra/activerecord"


require 'i18n'
require 'i18n/backend/fallbacks'
require 'i18n/debug'

require 'helpers/localize.helper.rb'

require 'json'

require "models/course"
require "models/student"
require "models/test"
require "models/testgrades"

require "config/environments"

require "commands/create"
require "commands/read"
require "commands/update"
require "commands/delete"



class MyStudentsGradesApp < Sinatra::Base
    register Sinatra::ActiveRecordExtension

    include Create
    include Read
    include Update
    include Delete

    helpers Sinatra::Base::LocalizeUtils

    set :root, File.dirname(__FILE__)
    MyStudentsGradesApp.set_configuration


    #default
    returned_http_status_code = 200

    #JSON API
    before do 
        #otherwise value gets stuck to the latest set and never get back to default
        returned_http_status_code = 200 
        content_type :json 
        I18n.locale = settings.locale
         I18n.locale =  session['locale'] || settings.locale
    end

    
    get '/' do
        redirect to ('/students')
    end

    get '/update_locale/:locale' do 
        session['locale'] = params[:locale]
        {'locale' => session['locale']}.to_json
    end

    #app entry point
    #will render html
    #then Angular will request the api
    get '/students' do 
        content_type :html
        send_file 'public/index.html'
    end

    post  '/api/student/create' do

        request.body.rewind
        request_payload = JSON.parse request.body.read

        res = create_student request_payload
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end      

    end

    get '/api/student/get/:id' do 
        get_student_by_id params[:id]
    end


    delete '/api/student/delete/:id' do
        res = delete_student params[:id]
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end

    end


    put '/api/student/update' do 
       
        request.body.rewind
        request_payload = JSON.parse request.body.read

        res = update_student_details request_payload
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end
    end

    get '/api/student/student_detail/student/:student_id' do
        student_detail_courses(params[:student_id]) .to_json
    end  


    get '/api/students/list/:limit/:offset' do 
        students = get_students params[:limit], params[:offset]
        students_total = get_students_count
        logger.debug students.to_json
        {"records": students, "count": students_total}.to_json
    end


    get '/api/students_by_course/course/:course_id' do 
        students_by_course = get_students_by_course params[:course_id], params[:limit], params[:offset]
        total_students_by_course = get_total_students_by_course params[:course_id]
        {"records": students_by_course, "count": total_students_by_course}.to_json
    end


    #Courses
    post  '/api/course/create' do
        request.body.rewind
        request_payload = JSON.parse request.body.read

        res = create_course request_payload['number'], request_payload['name']
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end     
    end 


    get '/api/courses/list/:limit/:offset' do 
        list_of_courses params[:limit], params[:offset]
    end


    put '/api/course/update' do

        request.body.rewind
        request_payload = JSON.parse request.body.read

        res = update_course request_payload
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end

    end

    delete '/api/course/delete/:id' do
        res = delete_course params[:id]
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end        
    end  



    #Tests
    get '/api/tests/list/:limit/:offset' do 
        list_of_tests params[:limit], params[:offset]
    end

    get '/api/test/:test_id' do
        res = get_test_detail params[:test_id]
        {"test_detail": res}.to_json
    end

    get '/api/test/grades/:test_id' do
        res = get_students_grades params[:test_id]
        {"records": res}.to_json
    end    

    post '/api/test/create' do
        request.body.rewind
        request_payload = JSON.parse request.body.read

        res = create_test request_payload
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end   
    end

    put '/api/test/update' do 
       
        request.body.rewind
        request_payload = JSON.parse request.body.read

        res = update_test_details request_payload
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end
    end


    delete '/api/test/delete/:id' do
        res = delete_test params[:id]
        unless (res == true)
            returned_http_status_code = 500
            logger.error res
            {:errors => res}.to_json
        end
    end



    after do 
        status returned_http_status_code
    end

end