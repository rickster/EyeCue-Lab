class AddShowcaseAndWorkToProject < ActiveRecord::Migration
  def self.up
      change_table :projects do |t|
        t.has_attached_file :showcase_image
        t.has_attached_file :category_image
      end
    end

    def self.down
      drop_attached_file :projects, :showcase_image
      drop_attached_file :projects, :category_image
    end
end
