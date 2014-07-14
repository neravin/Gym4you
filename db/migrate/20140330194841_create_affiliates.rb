class CreateAffiliates < ActiveRecord::Migration
  def change
    create_table :affiliates do |t|
      t.string :address
      t.decimal :price, precision: 8, scale: 2
      t.string :phone
      t.belongs_to :gymnasium, index: true

      t.timestamps
    end
  end
end
