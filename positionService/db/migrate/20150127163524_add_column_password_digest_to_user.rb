class AddColumnPasswordDigestToUser < ActiveRecord::Migration
  def change
    remove_column :users, :password
    remove_column :users, :salt
  end
end
