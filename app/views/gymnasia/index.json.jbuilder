json.array!(@gymnasia) do |gymnasium|
  json.extract! gymnasium, :id, :title, :description, :logo_url, :phone_overall, :site
  json.url gymnasium_url(gymnasium, format: :json)
end
