# frozen_string_literal: true

class LocationController < ApplicationController
  def create
    @location = Location.new(location_params)
    if @location.save
      render json: @location,  status: 201
    else
      render json: {},  status: 422
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

  def location_params
    params.require(:location).permit(:title, :address)
  end
end
