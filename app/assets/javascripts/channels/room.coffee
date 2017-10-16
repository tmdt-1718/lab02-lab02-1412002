

$(document).on 'keypress', '.input-search', (event) ->
    if event.keyCode is 13 # return = send
      App.room.speak event.target.value, 
      event.target.value = ""
      event.preventDefault()