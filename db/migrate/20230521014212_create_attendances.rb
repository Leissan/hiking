class CreateAttendances < ActiveRecord::Migration[6.1]
    def change
      create_table :attendances do |t|
        t.references :user
        t.references :hike
  
        t.timestamps
      end

  
    end

end