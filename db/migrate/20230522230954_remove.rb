class Remove < ActiveRecord::Migration[6.1]
  def change
    remove_reference :hikes, :participants
    add_reference :hikes, :location, foreign_key: true

  end
end
