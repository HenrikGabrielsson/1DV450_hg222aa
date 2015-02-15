class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.decimal :latitude, null: false, precision: 7, scale: 4
      t.decimal :longitude, null: false, precision: 7, scale: 4
      
      t.timestamps
    end
  end
end
