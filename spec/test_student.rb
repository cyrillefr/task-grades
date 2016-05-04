require '../app.rb'
require 'rspec'
require 'rack/test'



describe 'MyStudentsGradesApp' do
    include Rack::Test::Methods

    def app
        MyStudentsGradesApp
    end




    describe "Try student creation without last_name parameter " do 
        it "Should return a 500 status code and a non empty return json error" do 
            post '/api/student/create', { :first_name => 'Simon'}.to_json, {'CONTENT_TYPE' => 'application/json'}

            expect(last_response.ok?). to be false
            expect(last_response.body.size).to be > 0
            expect(last_response.status).to eq 500

        end
    end


    describe "The creation of a new student without any registered course" do
        it "creates an additionnal record in the Student table" do 
            count_before = Student.count
            post '/api/student/create', { :first_name => 'Simon', :last_name => 'De Monfort' }.to_json, {'CONTENT_TYPE' => 'application/json'}
            count_after = Student.count

            expect(count_after - count_before).to be(1)
            expect(last_response.ok?). to be true
            expect(last_response.body.size).to be(0)
        end
    end



    describe "Updating a student" do 
        it "updates first name" do
            s1 = Student.find_by(first_name: 'Simon')
            new_name = 'Raoul'
            put '/api/student/update' , {:id =>s1.id, :first_name => new_name, :last_name => s1.last_name}.to_json,  {'CONTENT_TYPE' => 'application/json'}
            puts 'prenom apres'
            s2 = Student.find(s1.id)
            get "/api/student/get/" + s2.id.to_s, {}, {'CONTENT_TYPE' => 'application/json'}

            expect(last_response.ok?). to be true
            expect(s2.first_name).to eq (new_name)


        end
    end



    describe "Delete student" do 
        it "deletes a record in the student table" do 
            count_before = Student.count
            s = Student.find_by(last_name: 'De Monfort')
            delete '/api/student/delete/' + s.id.to_s, {}, {'CONTENT_TYPE' => 'application/json'}

            count_after = Student.count

            expect(count_before - count_after).to be(1)
            expect(last_response.ok?). to be true
            expect(last_response.body.size).to be(0)

        end
    end




end