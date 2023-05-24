# frozen_string_literal: true

class LocationSerializer < ActiveModel::Serializer
  attributes :id, :title, :address
end
