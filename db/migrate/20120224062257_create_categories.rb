class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name, :null => false
      t.text :description
      t.boolean :is_active, :default => true
      t.integer :sort_order, :default => 0

      t.timestamps
    end
  end
end
