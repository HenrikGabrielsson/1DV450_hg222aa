class CreateUsers < ActiveRecord::Migration
  def change
    create_table :creators do |t|
      t.string :userName, null: false, limit: 100
      t.string :email, null: false

      t.timestamps
    end
  end
end
