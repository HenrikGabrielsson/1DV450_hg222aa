class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :tag, null: false, limit: 50

      t.timestamps
    end
  end
end
