# frozen_string_literal: true

class AllHikesSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :level, :owner_id, :location_id
end
