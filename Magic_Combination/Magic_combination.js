var magic_list = [[],[]]

const magic_recipe = {
    "fire":[["fog"],["flame","recovery"],["unquenchable fire"]],
    "water":[["fog","recovery"],["flood"],["Tsunami"]],
    "Null":["flame","flood","fog"]
}

const mob_object = {

}

var click_count = 0 ,magic_count = 0, mob_count = 0

var add_input = function(text){
    if(magic_count>1){
        var add_magic = Object.values(magic_recipe[magic_list[0][0]][magic_list[1][0]-1]).filter(item => Object.values(magic_recipe[magic_list[0][1]][magic_list[1][1]-1]).includes(item));
        if (add_magic.length == 1){
            $("#select_container").append('<input type="button" id="'+"'"+add_magic[0]+"'"+'" onclick="selection_input('+"'"+add_magic[0]+"'"+')" hidden><label for="'+"'"+add_magic[0]+"'"+'">'+add_magic[0]+'</label>')
        }
    }
}

var selection_input = function(text){
    if(magic_count < 3){
        i = magic_list[0].indexOf(text)
        if(i != -1){
            magic_list[1][i]++;
        }
        else{
            magic_list[0].push(text);
            magic_list[1].push(1);
        }
        i = magic_list[0].indexOf(text)

        click_count++
        magic_count++

        $("#game_container").append('<input type="button" id="'+click_count+'" onclick="remove_input('+"'"+click_count+"'"+','+"'"+text+"'"+')" hidden><label for="'+click_count+'">'+text+'</label>');
    }
}

var remove_input = function(texts,text){
    i = magic_list[0].indexOf(text)
    magic_list[1][i]--;
    if(magic_list[1][i] == 0){
        magic_list[0].splice(i)
        magic_list[1].splice(i)
    }

    $("#"+texts+"+label").remove();
    $("#"+texts).remove();
    magic_count--
}