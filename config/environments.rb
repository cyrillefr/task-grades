class Sinatra::Base

    def self.set_configuration
        configure :development, :test, :production do 
            set :database_file, "config/database.yml"
            #public files
            set :static, true
            enable :sessions
            use Rack::Protection::JsonCsrf
            set :logging, Logger::DEBUG
            #localization
            I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)
            I18n.load_path = Dir[File.join(settings.root, 'locales', '*.yml')]
            I18n.backend.load_translations
            #Test
            I18n.available_locales = [:en, :fr]
            set :locale, :en
        end
    end

end