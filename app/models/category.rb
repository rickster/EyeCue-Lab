class Category < ActiveRecord::Base
  has_many :projects
  
  default_scope :order => "sort_order"
end
