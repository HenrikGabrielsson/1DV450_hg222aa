class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :tag, null: false, limit: 50

      t.belongs_to :memory

      t.timestamps
    end
  end
end
