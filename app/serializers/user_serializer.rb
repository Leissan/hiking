# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :last_name, :all_hikes, :locations

  has_many :owned_hikes
  has_many :participated_hikes

  def all_hikes
    ActiveModelSerializers::SerializableResource.new(Hike.all, each_serializer: AllHikesSerializer).as_json
  end

  def locations
    ActiveModelSerializers::SerializableResource.new(Location.all, each_serializer: LocationSerializer).as_json
  end
end
