class CreateMemoriesPositions < ActiveRecord::Migration
  def change
    create_table :memories_positions, id:false do |t|
      t.belongs_to :memory, index: true, null: false
      t.belongs_to :position, index: true, null: false
    end
  end
end
