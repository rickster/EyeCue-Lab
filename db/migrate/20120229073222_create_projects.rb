class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, :null => false
      t.text :description, :default => ""
      t.text :story, :default => ""
      t.text :details, :default => ""
      t.has_attached_file :thumbnail
      t.integer :category_id, :null => false

      t.timestamps
    end
  end
end
