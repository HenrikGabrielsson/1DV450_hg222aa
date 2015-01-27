class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      
      t.string :email, :null => false
      t.string :appSite, :null => false
      t.text :appDescription, :null => false
      
      t.string :key
      t.integer :callCount, :null => false, :default => 0
      
      t.string :password, :null => false
      t.string :salt, :null => false      

      t.timestamps
    end
  end
end
