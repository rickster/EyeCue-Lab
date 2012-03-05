class Project < ActiveRecord::Base
  belongs_to :category
  has_and_belongs_to_many :tags
  
  scope :highlighted, where(:is_highlighted => true)
  scope :nonhighlighted, where(:is_highlighted => false)
  
  validates :name, :presence => true
  validates :category_id, :presence => true
  
  has_attached_file :thumbnail, :styles => {:medium => "305x140" }
  has_attached_file :category_image, :styles => {:medium => "300x250" }
  has_attached_file :showcase_image, :styles => {:medium => "745x550" }
  has_attached_file :logo_image, :styles => {:medium => "x33" }
  
  def to_json
    items = Hash.new
    items['id'] = id
    items['name'] = name
    items['description'] = description
    items['labels'] = name
    items['img'] = thumbnail.url
    items
  end
  
  def showcase_json
    items = Hash.new
    items['id'] = id
    items['name'] = name
    items['description'] = description
    if showcase_image.present?
      items['showcase'] = showcase_image.url
    end
    items['details'] = details
    items['story'] = story
    if logo_image.present?
      items['logo'] = logo_image.url
    end
    items['tags'] = tag_label_array
    items
  end
  
  def thumbnails_json
    items = Hash.new
    items['title'] = ""
    items['description'] = ""
    items['labels'] = name
    if category_image.present?
      items['url'] = category_image.url
    end
    items['tags'] = [] # add tags later
    items['redirect'] = ""
    items
  end
  
  private
  
  def tag_label_array
    tag_labels = []
    tags.each {|t|
      tag_labels.push(t.label)
    }
    tag_labels
  end
  
end
