class AddNameToAffiliates < ActiveRecord::Migration
  def change
    add_column :affiliates, :name, :string
  end
end
