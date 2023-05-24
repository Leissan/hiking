# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :user_id, :hike_id
end
