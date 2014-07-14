class RemovePriceFromAffiliates < ActiveRecord::Migration
  def change
    remove_column :affiliates, :price, :decimal
  end
end
