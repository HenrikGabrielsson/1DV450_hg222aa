class ChangeTablesWithPasswords < ActiveRecord::Migration
  def change
    remove_column :admins, :password
    remove_column :admins, :salt
    
    add_column :admins, :password_digest, :string, :null => false, :default => ""
    
  end
end
