# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # ローカル環境及び本番環境のフロントからのアクセスを許容する
    origins ['http://localhost:3000', 'https://sampleapp.site']

    resource '*',
    headers: :any,
    methods: %i[get post put patch delete options head]
  end
end
