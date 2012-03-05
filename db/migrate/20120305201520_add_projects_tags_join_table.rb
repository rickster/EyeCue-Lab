class AddProjectsTagsJoinTable < ActiveRecord::Migration
  def up
    create_table :projects_tags, :id => false do |t|
      t.integer :project_id, :null => false
      t.integer :tag_id, :null => false
    end
  end

  def down
    drop_table :projects_tags
  end
end
