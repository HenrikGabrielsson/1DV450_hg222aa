class CreateKeys < ActiveRecord::Migration
  def change
    create_table :keys do |t|
      
      t.string :key
      t.integer :callCount, :null => false, :default => 0
      t.belongs_to :user
      
      t.timestamps
    end
  end
end
