require '../app.rb'
require 'rspec'
require 'rack/test'



describe 'MyStudentsGradesApp' do
    include Rack::Test::Methods

    def app
        MyStudentsGradesApp
    end




    describe "Try course creation without name parameter " do 
        it "Should return a 500 status code and a non empty return json error" do 
            
            post '/api/course/create', { :number => '503 Economics'}.to_json, {'CONTENT_TYPE' => 'application/json'}

            expect(last_response.ok?). to be false
            expect(last_response.body.size).to be > 0
            expect(last_response.status).to eq 500


            expect(last_response.body).to include("Course name cannot be blank")

        end
    end






end