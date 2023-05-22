# frozen_string_literal: true

class CommentsController < ApplicationController
    def index
      @comment = Comment.where(hike_id: params[:hike_id])
      render json: @comment.to_json
    end
  
    def create
      @comment = Comment.new(hike_params)
      @comment.user_id = current_user.id
      @comment.save
    end
  
    def destroy
      @comment = Comment.find_by(hike_id: params[:hike_id], id: params[:id])
      @hike = Hike.find(hike_id: params[:id])
  
      if @comment.user_id != current_user.id && @comment.user_id != @hike.owner_id
  
        render json: {}
      else
        Comment.find_by(hike_id: params[:hike_id], id: params[:id]).destroy
      end
    end
  
    private
  
    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:text)
    end
end