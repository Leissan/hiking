class CreateHikes < ActiveRecord::Migration[6.1]
    def change
      create_table :hikes do |t|
        t.string :title, null: false
        t.string :description, null: false
        t.integer :level, null: false, default: 1
  
        t.timestamps
      end
  
      add_reference :hikes, :owner, foreign_key: { to_table: :users }
      add_reference :hikes, :participants, foreign_key: { to_table: :users }
    end
  end