# frozen_string_literal: true

class Hikes::ParticipantsController < ApplicationController
  before_action :set_hike, only: %i[show join leave]

  # GET /hikes
  def index
    @hikes = current_user.participated_hikes
    render json: @hikes, each_serializer: AllHikesSerializer, status: 200
  end

  # GET /hikes/1
  def show; end

  def join
    @user_hike = Attendance.new(user: current_user, hike: @hike)

    if @user_hike.save
      render json: @hike, each_serializer: HikeSerializer, status: 200
    else
      redirect_to @hike, alert: "Unable to join the hike."
    end
  end

  # POST /hikes/1/leave
  def leave
    @user_hike = Attendance.find_by(user: current_user, hike: @hike)

    if @user_hike&.destroy
      render json: {}, status: 200
    else
      redirect_to @hike, alert: "Unable to leave the hike."
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_hike
    @hike = Hike.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def hike_params
    params.require(:hike).permit(:name, :description, :location_id)
  end
end
