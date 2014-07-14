class Gymnasium < ActiveRecord::Base
	has_many :affiliates
	has_many :prices
	validates :title, presence: true
	validates :title, uniqueness: true
	validates :logo_url, allow_blank: true, format: {
		with: %r{\.(gif|jpg|png)\Z}i,
		message: " должен указывать на логотип формата PNG, JPG или GIF."
	}
end
