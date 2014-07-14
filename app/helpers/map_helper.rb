module MapHelper
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
