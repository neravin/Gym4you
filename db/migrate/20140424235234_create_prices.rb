class CreatePrices < ActiveRecord::Migration
  def change
    create_table :prices do |t|
      t.decimal :number_months
      t.decimal :price, precision: 8, scale: 2
      t.text :terms

      t.timestamps
    end
  end
end
