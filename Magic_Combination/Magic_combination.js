var add_input = function(text){
    $("#select_container").append('<input type="button" id="input_2" onclick="selection_input('+"'"+text+"'"+')" hidden><label for="input_2">'+text+'</label>')
}

var selection_input = function(text){
    $("#game_screen").append('<input type="button" id="input_3" onclick="$('+"'"+"#input_3~label"+"'"+').remove(); this.remove()" hidden><label for="input_3">'+text+'</label>')
}