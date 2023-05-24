Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
 
  resources :users

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  # Session Routes
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :hikes do
    member do
      resource :owners, controller: "hikes/owners"
      resource :participants, controller: "hikes/participants" do
        post "/join", to: "hikes/participants#join"
        delete "/leave", to: "hikes/participants#leave"
      end
    end
    resources :comments, controller: "hikes/comments"
  end

  resource :location, only: %i[create], controller: "location"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
