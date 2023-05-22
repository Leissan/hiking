# frozen_string_literal: true

class OwnersController < ApplicationController
    before_action :set_hike, only: %i[show update destroy]
  
    # GET /hikes
    def index
      @hikes = Hike.where(owner_id: current_user.id)
    end
  
    # GET /hikes/1
    def show; end
  
    # POST /hikes
    def create
      @hike = Hike.new(hike_params)
      @hike.owner_id = current_user.id
  
      if @hike.save
        redirect_to @hike, notice: "Hike was successfully created."
      else
        render :new
      end
    end
  
    # PATCH/PUT /hikes/1
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
      redirect_to hikes_url, notice: "Hike was successfully destroyed."
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