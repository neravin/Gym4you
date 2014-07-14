class CreateJoinTableAffiliatePrice < ActiveRecord::Migration
  def change
    create_join_table :affiliates, :prices do |t|
      # t.index [:affiliate_id, :price_id]
      # t.index [:price_id, :affiliate_id]
      t.index :affiliate_id
      t.index :price_id
    end
  end
end
