# frozen_string_literal: true

class ParticipantsController < ApplicationController
    before_action :set_hike, only: %i[show join leave]
  
    # GET /hikes
    def index
      @hikes = Hike.where("? in participant_ids", current_user.id)
    end
  
    # GET /hikes/1
    def show; end
  
    def join
      @user_hike = Attendance.new(user: current_user, hike: @hike)
  
      if @user_hike.save
        redirect_to @hike, notice: "You joined the hike."
      else
        redirect_to @hike, alert: "Unable to join the hike."
      end
    end
  
    # POST /hikes/1/leave
    def leave
      @user_hike = Attendance.find_by(user: current_user, hike: @hike)
  
      if @user_hike&.destroy
        redirect_to @hike, notice: "You left the hike."
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