class Price < ActiveRecord::Base
	has_and_belongs_to_many :affiliates
	belongs_to :gymnasium
end
