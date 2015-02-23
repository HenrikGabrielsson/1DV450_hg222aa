class CreateMemories < ActiveRecord::Migration
    create_table :memories do |t|
      t.string :title, null: false, limit: 100
      t.datetime :eventDate, null: false
      t.text :memoryText, null: false, limit: 400
      
      t.decimal :latitude, null: false, precision: 7, scale: 4
      t.decimal :longitude, null: false, precision: 7, scale: 4      
   
      t.belongs_to :creator
      
      t.timestamps
  end
end
