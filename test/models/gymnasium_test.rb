require 'test_helper'

class GymnasiumTest < ActiveSupport::TestCase
	test "Gymnasium title must not be empty" do
		# Название товара не должно оставаться пустым
		gym = Gymnasium.new
		assert gym.invalid?
		assert gym.errors[:title].any?
		#assert gym.errors[:description].any?
		#assert gym.errors[:logo_url].any?
		#assert gym.errors[:phone].any?
	end

	def new_gym(logo_url)
		Gymnasium.new( title: "Богатырь-спорт",
							description: "asap good",
							logo_url: logo_url)
	end

	test "logo url" do
		# Url логотипа
		ok = %w{ gym.png gym.jpg gym.gif GYM.JPG GYM.Jpg
			http://a.f.r/d/a/gym.png }
		bad = %w{ gym.rar gym.png/other gym.jpg.rar }

		ok.each do |name|
			# должно быть приемлимым
			assert new_gym(name).valid?, "#{name} should be valid"
		end
		
		bad.each do |name|
			# не должно быть приемлимым
			assert new_gym(name).invalid?, "#{name} shouldn't be valid"
		end
	end

	test "gym isn't valid without a unique title" do
		# Проверка уникальности названия спортзала
		gym = Gymnasium.new(title: gymnasia(:viking_gym).title)
		assert gym.invalid?
		# уже было использованно
		assert_equal ["has already been taken"], 
			gym.errors[:title] 
	end
end
