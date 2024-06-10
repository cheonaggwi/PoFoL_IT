var magic_list = [[],[]]

var selection_list = ["fire","water"]

const magic_recipe = {
    "fire":[["fog"],["flame","recovery"],["unquenchable fire"]],
    "water":[["fog","recovery"],["flood"],["tsunami"]],
    "Null":["flame","flood","fog"]
}

const mob_object = {

}

var click_count = 0 ,magic_count = 0, mob_count = 0

var select_container_z_index = function(z){
    $('.select_container').css('z-index','0');
    $('#select_container'+z).css('z-index','1');
}

var add_input = function(){
    if(magic_count>1){
        if(magic_list[0].length == 1){
            var add_magic = Object.values(magic_recipe[magic_list[0][0]][magic_list[1][0]-1])
            if(magic_count != 3){
                add_magic = add_magic.filter(item => Object.values(magic_recipe["Null"]).includes(item));
            }
        } else {
            var add_magic = Object.values(magic_recipe[magic_list[0][0]][magic_list[1][0]-1]).filter(item => Object.values(magic_recipe[magic_list[0][1]][magic_list[1][1]-1]).includes(item));
            if(magic_list[0].length == 3){
                add_magic = add_magic.filter(item => Object.values(magic_recipe[magic_list[0][2]][magic_list[1][2]-1]).includes(item));
            }
        }
        if (add_magic.length == 1){
            i = selection_list.indexOf(add_magic[0])
            if(i == -1){
                selection_list.push(add_magic[0])
                $("#select_container0 , #select_container"+magic_count).append('<input type="button" id="'+"'"+add_magic[0]+"'"+'" onclick="selection_input('+"'"+add_magic[0]+"'"+')" hidden><label for="'+"'"+add_magic[0]+"'"+'"><img src="magic_image/'+add_magic[0]+'.png" width="90%" height="90%" >'+add_magic[0]+'</label>')
            }
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

        $("#game_container").append('<input type="button" id="'+click_count+'" onclick="remove_input('+"'"+click_count+"'"+','+"'"+text+"'"+')" hidden><label for="'+click_count+'"><img src="magic_image/'+text+'.png" width="90%" height="90%" >'+text+'</label>');
    }
}

var remove_input = function(texts,text){
    i = magic_list[0].indexOf(text)
    magic_list[1][i]--;
    if(magic_list[1][i] == 0){
        magic_list[0].splice(i)
        magic_list[1].splice(i)
    }

    console.log(i)

    $("#"+texts+"+label").remove();
    $("#"+texts).remove();
    magic_count--
}