class Friend < ApplicationRecord
	after_create_commit { FriendBroadcastJob.perform_later self }
	after_destroy { DeleteFriendJob.perform_later self}
	after_update { AfterComfirmJob.perform_later self}
end
