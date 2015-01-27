class CreateAdmins < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      
      t.string :userName, :null => false
      t.string :password, :null => false
      t.string :salt, :null => false

      t.timestamps
    end
  end
end
