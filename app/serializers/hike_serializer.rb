# frozen_string_literal: true

class HikeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :level, :owner_id, :location_id, :location_title, :location_address

  def location_title
    location.title
  end

  def location_address
    location.address
  end

  def location
    @location ||= Location.find(object.location_id)
  end

  belongs_to :owner
  has_many :participants
  has_many :comments
end
