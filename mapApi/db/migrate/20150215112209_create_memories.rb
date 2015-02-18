class CreateMemories < ActiveRecord::Migration
    create_table :memories do |t|
      t.string :title, null: false, limit: 100
      t.datetime :eventDate, null: false
      t.text :memoryText, null: false, limit: 400
      
      t.belongs_to :creator
      t.belongs_to :position
      
      t.timestamps
  end
end
