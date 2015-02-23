class MemoriesTags < ActiveRecord::Migration
  def change
    create_table :memories_tags, id: false do |t|
      t.belongs_to :memory, index: true, null: false
      t.belongs_to :tag, index: true, null: false
    end
  end
end
