class AddColumnPasswordDigestToUser2 < ActiveRecord::Migration
  def change
    add_column :users, :password_digest, :string, :null => false, :default => ""
  end
end
