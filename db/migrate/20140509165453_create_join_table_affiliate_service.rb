class CreateJoinTableAffiliateService < ActiveRecord::Migration
  def change
    create_join_table :affiliates, :services do |t|
      # t.index [:affiliate_id, :service_id]
      # t.index [:service_id, :affiliate_id]
      t.index :affiliate_id
      t.index :service_id
    end
  end
end
