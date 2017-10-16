class Chat < ApplicationRecord
	after_create_commit { RoomBroadcastJob.perform_later self }
end
