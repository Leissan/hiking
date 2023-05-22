class Location < ApplicationRecord
    has_many :hikes
  
    validates :title, presence: true
end