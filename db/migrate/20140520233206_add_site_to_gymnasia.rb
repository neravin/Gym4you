class AddSiteToGymnasia < ActiveRecord::Migration
  def change
    add_column :gymnasia, :site, :string
  end
end
