class MapController < ApplicationController
  def index
  	@address = params[:my_address]
  	@radius = params[:radius].to_f
    @first_price = params[:first_price].to_f
    @last_price = params[:last_price].to_f
    @price_option = params[:price_option].to_f

  	if(@address && (@radius > 0) && (@first_price < @last_price))
      @my_location = Geocoder.coordinates(@address)
		 	@affilates = Affiliate.near(@address, @radius, :units => :km).
        includes(:prices).
        where("prices.price >= ? AND prices.price <= ? AND prices.number_months = ?", @first_price, @last_price, @price_option)
        .sort_by! &:gymnasium_id
 		end
  end

  def mi_in_km
  	1.609344
  end

  def km_in_mi
  	0.621371192
  end

  def to_kilometers(mi)
  	mi * mi_in_km
  end

  def to_miles(km)
  	km * km_in_mi
  end
end
