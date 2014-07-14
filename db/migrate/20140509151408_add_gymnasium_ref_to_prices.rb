class AddGymnasiumRefToPrices < ActiveRecord::Migration
  def change
    add_reference :prices, :gymnasium, index: true
  end
end
