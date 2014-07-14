class AddLatitudeAndLongitudeToAffiliate < ActiveRecord::Migration
  def change
    add_column :affiliates, :latitude, :float
    add_column :affiliates, :longitude, :float
  end
end
