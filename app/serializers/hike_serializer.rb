class HikeSerializer < ActiveModel::Serializer
    attributes :id, :title, :description, :level, :owner_id, :location_id
  
    belongs_to :owner
    has_many :participants
end