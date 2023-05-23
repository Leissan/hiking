Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
 namespace :api do

  resources :users

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  # Session Routes
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :hikes do 
    resource :owners
    resource :participants
  end
 end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
