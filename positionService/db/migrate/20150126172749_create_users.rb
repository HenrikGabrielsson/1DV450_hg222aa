class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      
      t.string :appSite, :null => false
      t.text :appDescription
      t.string :key
      t.string :email, :null => false
      t.string :password, :null => false
      t.string :salt, :null => false
      t.integer :callCount, :null => false, :default => 0
       
      t.timestamps
    end
  end
end
