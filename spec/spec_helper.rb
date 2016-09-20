require './app.rb'
require 'rspec'
require 'rack/test'


RSpec.configure do |config|
  config.include Rack::Test::Methods
end

def app
    MyStudentsGradesApp
end
