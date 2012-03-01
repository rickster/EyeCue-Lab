class AddIsHightlightedToProject < ActiveRecord::Migration
  def change
    add_column :projects, :is_highlighted, :boolean, :default => false
    add_column :projects, :highlighted_order, :integer, :default => 0
  end
end
