class CreateGymnasia < ActiveRecord::Migration
  def change
    create_table :gymnasia do |t|
      t.string :title
      t.text :description
      t.string :logo_url
      t.string :phone_overall

      t.timestamps
    end
  end
end
