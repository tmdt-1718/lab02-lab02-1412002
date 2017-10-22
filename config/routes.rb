Rails.application.routes.draw do
    mount ActionCable.server => '/cable'

  get "/" => "sessions#home"
  get     "login"    => "sessions#new"
  post    "login"    => "sessions#create"
  get  "logout"   => "sessions#destroy"

  	resources :users


  	get "messenger" => "messenger#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
