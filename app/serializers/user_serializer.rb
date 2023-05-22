class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :name, :last_name
  
    has_many :owned_hikes
    has_many :participated_hikes
end