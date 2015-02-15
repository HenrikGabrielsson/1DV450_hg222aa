class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :userName, null: false, limit: 100
      t.string :email, null: false
      
      t.string :password_digest, null: false
      
      t.timestamps
    end
  end
end
