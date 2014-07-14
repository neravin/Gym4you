class Affiliate < ActiveRecord::Base
  belongs_to :gymnasium

  has_and_belongs_to_many :prices
  has_and_belongs_to_many :services

  validates :address, :phone, presence: true
  
  geocoded_by :address
  #after_validation :geocode, :if => :address_change?
  after_validation :geocode
end
