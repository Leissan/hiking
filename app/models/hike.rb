# frozen_string_literal: true

class Hike < ApplicationRecord
  has_many :comments
  belongs_to :location

  belongs_to :owner, class_name: "User"
  has_many :attendances
  has_many :participants, through: :attendances, source: :user

  validates :title, presence: true
end
