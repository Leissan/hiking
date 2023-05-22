# frozen_string_literal: true

class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        session[:user_id] = user.id
        render json: user,  status: 201
      else
        render json: { errors: user.errors.full_messages }, status: 422
      end
    end
  
    def show
      if current_user
        render json: current_user, serializer: UserSerializer, status: 200
      else
        render json: { error: "Not authorized" }, status: 401
      end
    end
  
    private
  
    def user_params
      params.permit(:username, :password, :password_confirmation, :name, :last_name)
    end
end

