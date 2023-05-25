# frozen_string_literal: true

class Hikes::CommentsController < ApplicationController
  before_action :set_comments
  def index
    render json: @comments, each_serializer: CommentSerializer
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.hike_id = params[:hike_id]
    @comment.save

    render json: @comments, each_serializer: CommentSerializer
  end

  def destroy
    hike = Hike.find(params[:hike_id])
    comment = Comment.find_by(hike_id: hike.id, id: params[:id])

    if comment.user_id != current_user.id && current_user.id != hike.owner_id
      render json: Comment.where(hike_id: hike.id), each_serializer: CommentSerializer
    else
      Comment.find_by(hike_id: hike.id, id: params[:id]).destroy
      @comments = set_comments
      render json: @comments, each_serializer: CommentSerializer
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def comment_params
    params.require(:comment).permit(:text)
  end

  def set_comments
    @comments = Comment.where(hike_id: params[:hike_id])
  end
end
