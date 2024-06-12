var magic_list = [[],[]]

var selection_list = []

var mouse_position = [0,0]

var imformation_object = {}

const magic_recipe = {
    "fire":[["fog","void","dust"],["flame","recovery"],["unquenchable fire"]],
    "water":[["fog","recovery","tree","void"],["flood"],["tsunami"]],
    "grass":[["tree","void","dust"],[],["earthquake"]],
    "Null":["flame","flood","fog","tree","dust"]
}

var click_count = 0 ,magic_count = 0

var select_container_z_index = function(z){
    $('.select_container').css('z-index','0');
    $('#select_container'+z).css('z-index','1');
}

var add_input = function(){
    if(magic_count>1){
        var add_magic = Object.values(magic_recipe[magic_list[0][0]][magic_list[1][0]-1])
        if(magic_list[0].length > 1){
            add_magic = add_magic.filter(item => Object.values(magic_recipe[magic_list[0][1]][magic_list[1][1]-1]).includes(item));
            if(magic_list[0].length == 3){
                add_magic = add_magic.filter(item => Object.values(magic_recipe[magic_list[0][2]][magic_list[1][2]-1]).includes(item));
            }
        }
        if(magic_count != 3){
            add_magic = add_magic.filter(item => Object.values(magic_recipe["Null"]).includes(item));
        }
        if (add_magic.length == 1){
            i = selection_list.indexOf(add_magic[0])
            if(i == -1){
                new_magic_add(add_magic[0],magic_count)
            }
        }
    }
}

var new_magic_add = function(magic,star){
    selection_list.push(magic)
    imformation_object[magic] = [""+star,[""+magic_list[0]],[""+magic_list[1]]]
    $("#select_container0 , #select_container"+star).append('<input type="button" id="'+"'"+magic+"'"+'" onclick="selection_input('+"'"+magic+"'"+')" class="magic" hidden><label for="'+"'"+magic+"'"+'" ><img src="magic_image/'+magic+'.png" width="100%" height="90%" >'+magic+'</label>')
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

        $("#game_container").append('<input type="button" id="'+click_count+'" onclick="remove_input('+"'"+click_count+"'"+','+"'"+text+"'"+')" hidden><label for="'+click_count+'"><img src="magic_image/'+text+'.png" width="100%" height="90%" >'+text+'</label>');
    }
}

var remove_input = function(texts,text){
    i = magic_list[0].indexOf(text)
    magic_list[1][i]--;
    if(magic_list[1][i] == 0){
        magic_list[0].splice(i,1)
        magic_list[1].splice(i,1)
    }

    $("#"+texts+"+label").remove();
    $("#"+texts).remove();
    magic_count--
}

document.addEventListener('DOMContentLoaded', function() {
    new_magic_add("fire",1)
    new_magic_add("water",1)
    new_magic_add("grass",1)
  });

$(document).on('mouseenter','.magic+label', function() {
    if ($('#imformation_checkbox').is(':checked')) {
        $(this).css('background-color', 'yellow');
        $("#imformation").css('display', 'none');
        $("#imformation").text(imformation_object[$(this).text()][0])
    }

}).on('mouseleave','.magic+label', function() {
    $(this).css('background-color', '');
    $("#imformation").css('display', 'none');

}).on('mousemove', '.magic+label', function(event) {
    if ($('#imformation_checkbox').is(':checked')) {
        $("#imformation").css('display', 'inline-block');
        $("#imformation").css('left', event.clientX);
        $("#imformation").css('top', event.clientY);
    }

});


