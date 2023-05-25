# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :owned_hikes, foreign_key: "owner_id", class_name: "Hike"
  has_many :attendances
  has_many :participated_hikes, through: :attendances, source: :hike

  has_many :comments

  validates :name, :last_name, presence: true
  validates :username, uniqueness: true
end
