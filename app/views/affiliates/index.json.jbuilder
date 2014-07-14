json.array!(@affiliates) do |affiliate|
  json.extract! affiliate, :id, :name, :city, :address, :phone, :latitude, :longitude, :gymnasium_id
  json.url affiliate_url(affiliate, format: :json)
end
