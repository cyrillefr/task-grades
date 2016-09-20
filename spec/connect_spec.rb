require 'spec_helper'


RSpec.describe 'MyStudentsGradesApp' do

    describe "Connec to the app" do
        context "When lands at home page" do
            it "sends back json" do
                get "/"
                expect(last_response.headers['Content-Type']).to eq "application/json"          
            end
            it "then redirects to students page" do 
                get '/'
                expect(last_response.redirect?).to be true
                last_response.redirect last_response.headers['Location']
                expect(last_response.headers['Location']).to include('/students')
            end
        end
        context "When landed at home page" do
            it "sends back html" do
                get '/students'
                    expect(last_response.headers['Content-Type']).to eq "text/html;charset=utf-8"
                    #expect(last_response.body).to include('List of all students')
            end
        end
    end

    describe "List of students" do
        context "When landed at home page" do
            it "displays a list of the 5 first students (if there is 5)" do
                get '/api/students/list/5/0'
                expect(last_response.ok?). to be true
                expect(JSON.parse(last_response.body)).to be_a(Hash)
            end
        end   
    end

end
