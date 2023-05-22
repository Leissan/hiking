class CreateUsers < ActiveRecord::Migration[6.1]
    def change
      create_table :users do |t|
        t.string :name, null: false
        t.string :last_name, null: false
        t.string :username
        t.string :password_digest
        t.string :image_url
  
        t.timestamps
      end
    end
  end