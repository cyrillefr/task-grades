require '../app.rb'
require 'rspec'
require 'rack/test'



describe 'MyStudentsGradesApp' do
    include Rack::Test::Methods

    def app
        MyStudentsGradesApp
    end



    describe "Hello" do
        it "prints Hello" do 
            get '/'
            expect(last_response.ok?). to be true
            expect(last_response.body).to eq 'Hello'
            #This is a JSON api
            expect(last_response.headers['Content-Type']).to eq 'application/json'
        end
    end

    describe "List of students" do
        it "lists 5 first students" do
            get '/api/students/list/5/0'
            expect(last_response.ok?). to be true
            expect(JSON.parse(last_response.body)).to be_a(Hash)
        end   
    end


    #describe "create a test" do 
    #    it "checks return message from creation" do
    #        course = Course.find(1)
     #       test = course.test.create(name: "This is a second  test")
#
 #           expect(test.errors.messages.length).to eq(0)
  #      end
   # end
=begin
    describe "create a student" do
        it "checks return message from creation" do
            s = Student.new :first_name => 'John', :last_name => 'Doe' 
            s.save
            expect(s.errors.messages.length).to eq(0)
        end
    end

    describe "create a course" do 
        it "checks return message from creation" do
            c = Course.new :number => 'CS 101', :name => 'Intro to C.S.'
            c.save
            expect(c.errors.messages.length).to eq(0)
        end
    end
=end
    describe "create a course_student (join table)" do 



        it "checks collection non empty" do
            #student = Student.new :first_name => 'John', :last_name => 'Doe' 
            #course = Course.new :number => 'CS 101', :name => 'Intro to C.S.'

            student = Student.find(2)
            #course =  Course.find(1)

            #puts '-----------'
            #puts  'student.course.size: ' + student.course.size.to_s
            #puts '-------------'
            #puts 'student.course.class'
            #puts '-------------'
             #puts student.course.class
             #puts student.course.inspect
             #puts student.course.methods

            #puts student.course.destroy(Course.find(1))

             #puts student.course.to_json

            puts 'student.class: '            
            puts student.class
            puts student.class.ancestors
            
        end

        


        #it " check" do
        #student = Student.find(1)
        #course =  Course.find(1)
        #course = Course.new :number => 'CS 101', :name => 'Intro to C.S.'
        #student = Student.new :first_name => 'John', :last_name => 'Doe' 
        #c.student<<s 

        

        #end
    end


    
end