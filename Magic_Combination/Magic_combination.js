var magic_id_object = {
    "fire":0,
    "water":0
}

var magic_object = {
    "fire":0,
    "water":0
}

var object_count = 0

var add_input = function(text){
    $("#select_container").append('<input type="button" id="'+"'"+text+"'"+'" onclick="selection_input('+"'"+text+"'"+')" hidden><label for="'+"'"+text+"'"+'">'+text+'</label>')
}

var selection_input = function(text){
    if(object_count < 3){
        object_count++
        magic_id_object[text]++
        magic_object[text]++
        texts = text+magic_id_object[text]
        $("#game_container").append('<input type="button" id="'+texts+'" onclick="remove_input('+"'"+texts+"'"+','+"'"+text+"'"+')" hidden><label for="'+texts+'">'+text+'</label>')
    }
}

var remove_input = function(texts,text){
    $("#"+texts+"+label").remove();
    $("#"+texts).remove();
    magic_object[text]--
    object_count--
    console.log(magic_object[text])
}