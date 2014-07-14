class AddCityToAffiliates < ActiveRecord::Migration
  def change
    add_column :affiliates, :city, :string
  end
end
