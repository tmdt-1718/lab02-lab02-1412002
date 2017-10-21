class Chat < ApplicationRecord
	after_create_commit { RoomBroadcastJob.perform_later self }
	# after_update { AfterReadMessageJob.perform_later self}
	
end
