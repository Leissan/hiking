class CreateLocations < ActiveRecord::Migration[6.1]
    def change
      create_table :locations do |t|
        t.string :title, null: false
        t.string :address, null: false
        t.timestamps
      end
  
      
    end
  end