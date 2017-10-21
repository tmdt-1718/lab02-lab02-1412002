class CreateFriends < ActiveRecord::Migration[5.1]
  def change
    create_table :friends do |t|
      t.integer :usera
      t.integer :userb
      t.boolean :accept, :default => false

      t.timestamps
    end
  end
end
