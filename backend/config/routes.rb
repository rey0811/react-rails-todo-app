Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks, only: %i[index show create update destroy]
      get :health_check, to: 'health_check#index'
    end
  end
end
