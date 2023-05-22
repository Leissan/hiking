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
    def show; end
  
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