class Location < ApplicationRecord
    has_many :hikes
  
    validates :title, presence: true
    validates :address, uniqueness: true
end