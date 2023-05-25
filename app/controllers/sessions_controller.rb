# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: 201
    else
      render json: { errors: ["Invalid username or password"] }, status: 401
    end
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    if user
      session.delete :user_id
      head 204
    else
      render json: { errors: ["Invalid username or password"] }, status: 401
    end
  end
end
