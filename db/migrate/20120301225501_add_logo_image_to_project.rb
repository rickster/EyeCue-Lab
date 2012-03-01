class AddLogoImageToProject < ActiveRecord::Migration
  def self.up
      change_table :projects do |t|
        t.has_attached_file :logo_image
      end
    end

    def self.down
      drop_attached_file :projects, :logo_image
    end
end
