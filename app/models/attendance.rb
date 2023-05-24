class Attendance < ApplicationRecord
    belongs_to :user
    belongs_to :hike

    validates :user_id, uniqueness: { scope: :hike_id }

end