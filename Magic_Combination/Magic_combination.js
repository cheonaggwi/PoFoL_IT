var magic_list = [[],[]]

var selection_list = [[],[]]

var mouse_position = [0,0]

var imformation_object = {}

const magic_recipe = {
    "fire":[["2fog","3void","2dust"],["2flame","3recovery"],["3unquenchable fire"]],
    "water":[["2fog","3recovery","2tree","3void","4sealed world tree"],["2flood"],["3tsunami"]],
    "grass":[["2tree","3void","2dust"],[],["3earthquake"]],
    "void":[[],[],["5BLACK HOLE"]],
    "flame":[["5VOLCANO"],[],[]],
    "dust":[["5VOLCANO"],[],[]],
    "earthquake":[["5VOLCANO"],[],[]],
    "unquenchable fire":[["4eternal life"],[],[]],
    "recovery":[["4eternal life"],[],[]],
    "tree":[["4sealed world tree"],[],[]],
    "eternal life":[["4sealed world tree"],[],[]],
    "Null":["2flame","2flood","2fog","2tree","2dust","4eternal life"]
}

var click_count = 0 ,magic_count = 0

var select_container_display = function(z){
    $('.select_container').css('display','none');
    $('#select_container'+z).css('display','grid');
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
            add_magic = [(""+add_magic[0]).substring(1),(""+add_magic[0]).substring(0,1)]
            i = selection_list[0].indexOf(add_magic[0])
            if(i == -1){
                new_magic_add(add_magic[0],add_magic[1])
            }
        }
    }
}

var new_magic_add = function(magic,star){
    selection_list[0].push(magic)
    selection_list[1].push(Number(star))
    imformation_object[magic] = [""+star,(""+magic_list[0]).split(","),(""+magic_list[1]).split(",")]
    $("#select_container0 , #select_container"+star).append('<input type="button" id="'+"'"+magic+"'"+'" onclick="selection_input('+"'"+magic+"'"+')" class="magic" hidden><label for="'+"'"+magic+"'"+'" ><img src="magic_image/'+magic+'.png" width="80%" height="80%" ><br>'+magic+'</label>')
    /** 
     * $("#log").css({"display": "inline-block","opacity": "1",'animation-name':''}); 
     * 
    */
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
        $("#imformation #imformation_detail").text(imformation_object[$(this).text()][0])
        var text = ''
        for(var i=0;i<imformation_object[$(this).text()][1].length; i++){
            for(var j = 0; j<imformation_object[$(this).text()][2][i]; j++){
                text = text+'<img src="magic_image/'+imformation_object[$(this).text()][1][i]+'.png" width="100%" height="90%" >'
            }
        }
        $("#imformation #making_recipe").html(text)

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


