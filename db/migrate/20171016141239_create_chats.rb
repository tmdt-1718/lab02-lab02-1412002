class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.integer :usera
      t.integer :userb
      t.text :body
      t.boolean :read, :default => false
      t.timestamps
    end
  end
end
