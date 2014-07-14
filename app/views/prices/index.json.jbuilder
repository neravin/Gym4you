json.array!(@prices) do |price|
  json.extract! price, :id, :number_months, :price, :terms
  json.url price_url(price, format: :json)
end
