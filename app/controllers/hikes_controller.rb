# frozen_string_literal: true

class HikesController < ApplicationController
  before_action :set_hike, only: %i[show]

  # GET /hikes
  def index
    @hikes = Hike
             .where.not(owner_id: current_user.id)
             .where.not("? in participant_ids", current_user.id)
    render json: @hikes.to_json
  end

  # GET /hikes/1
  def show
    render json: @hike, serializer: HikeSerializer, status: 200
  end

  def create
    @hike = Hike.new(hike_params)
    @hike.owner_id = current_user.id

    if @hike.save
      render json: @hike, serializer: HikeSerializer, status: 200
    else
      render json: {}
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_hike
    @hike = Hike.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def hike_params
    params.require(:hike).permit(:title, :description, :location_id, :level)
  end
end
