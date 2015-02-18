class AddAdmin < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.string :userName, :null => false
      
      t.string :password_digest, :null => false
 
      t.timestamps
    end
  end
end
