# frozen_string_literal: true

class Hikes::OwnersController < ApplicationController
  before_action :set_hike, only: %i[show update destroy]

  # GET /hikes
  def index
    @hikes = Hike.where(owner_id: current_user.id)
  end

  def update
    return render json: {} if @hike.owner_id != current_user.id

    if @hike.update(hike_params)
      redirect_to @hike, notice: "Hike was successfully updated."
    else
      render :edit
    end
  end

  # DELETE /hikes/1
  def destroy
    return render json: {} if @hike.owner_id != current_user.id

    @hike.destroy
    render json: {}, status: 200
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_hike
    @hike = Hike.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def hike_params
    params.require(:hike).permit(:title, :description, :location_id, :level, :planned_members_number)
  end
end
