$(document).ready(function(){
    play_now = 1;

    $(".start_btn").click(function(){
        $('#myModal').modal('show');
        $('#myModal input').val("");
        $('.player1_name h2').html('Player 1');
        $('.player2_name h2').html('Player 2');
    });

    $('.new_game').on('click', resetGame);

    $('.set_btn').on('click', function(){
        var player1 = ($('.first_in').val()) != ""?$('.first_in').val():'Player 1';   
        $('.player1_name h2').html(player1);
        var player2 = ($('.sec_in').val()) != ""?$('.sec_in').val():'Player 2';
        $('.player2_name h2').html(player2);
    });

    $('.player1_name i').slideDown('slow');

    $(document).on('click','td', function(){
        var t = parseInt($(this).index()) + 1;
        
        if(play_now == 1){
            if(!$(this).parents('table').find('tr:first-child').find('td:nth-child(' + t + ')').find('.coin').hasClass('red')){
                InsertCoin('yellow', $(this).index());
                $('.player1_name i').hide();
                $('.player2_name i').slideDown();
                play_now = 2;
            }    
        }else{
            if(!$(this).parents('table').find('tr:first-child').find('td:nth-child(' + t + ')').find('.coin').hasClass('yellow')){
                InsertCoin('red', $(this).index());
                $('.player2_name i').hide();
                $('.player1_name i').slideDown();
                play_now = 1;
            }
        }
    });

    $('#winner_modal').on('hidden.bs.modal', function () {
        resetGame();
    });

    resetGame();
});

function InsertCoin(coin_color, index){
    var next_play = 0;
    for(var i = main_array.length - 1; i >= 0; i--){
        for(var j = 0; j <= main_array[i].length - 1; j++){
            if(j == index){
                if(main_array[i][j] == ""){
                    main_array[i][j] = coin_color;
                    next_play = 1;
                    break;
                }
            }
        }
        if(next_play == 1){
            break;
        }
    }
    buildGameTable(main_array);
    setTimeout(function(){ 
        checkForWin(main_array);
        checkForFullBoard(main_array);
    }, 200);
    return main_array;
}

function buildStartArray(){
    var main_arr = [];
    for(var i = 0; i < 6; i++){
        var arr = [];
        for(var j = 0; j < 7; j++){
            arr.push("");
        }
        main_arr.push(arr);
    }
    return main_arr;
}

function buildGameTable(main_array){ 
    var table = "<table class='main_board'>";
    for(var i = 0; i < main_array.length; i++){
        table += "<tr>";
            for(var j = 0; j < main_array[i].length; j++){
                table += "<td>";
                if(main_array[i][j] == 'yellow'){
                    table += "<div class='coin pointer yellow'><i class='fa fa-arrow-down down_a'></i></div>";
                }else if(main_array[i][j] == 'red'){
                    table += "<div class='coin pointer red'><i class='fa fa-arrow-down down_a'></i></div>";
                }else{
                    table += "<div class='coin pointer'><i class='fa fa-arrow-down down_a'></i></div>";
                }       
                table += "</td>";
            }
        table += "</tr>";
    }
    table += "</table>";
    $('.table_container').html(table);
    var td_width = $('.main_board td').css('width');
    $('.main_board td').css('height', td_width);
    highligthDownArrow();
}

function highligthDownArrow(){
    $("td").hover(function(){
        var t = parseInt($(this).index()) + 1;
        $(this).parents('table').find('td:nth-child(' + t + ')').find('.coin .down_a').css('display','inline-block');
    }, function(){
        var t = parseInt($(this).index()) + 1;
        $(this).parents('table').find('td:nth-child(' + t + ')').find('.coin .down_a').hide();
    });
}

function checkForWin(main_array){      
    for(var i = 0; i < main_array.length; i++){   
        var counter1 = 0;  
        var counter2 = 0;   
        for(var j = 0; j < main_array[i].length; j++){   

            if(j + 1 < main_array[i].length){
                if(main_array[i][j] == main_array[i][j + 1] && main_array[i][j] != ""){  // 4 in a row check
                    if(j + 2 < main_array[i].length){
                        if(main_array[i][j + 1] == main_array[i][j + 2] && main_array[i][j + 1] != ""){
                            if(j + 3 < main_array[i].length){
                                if(main_array[i][j + 2] == main_array[i][j + 3] && main_array[i][j + 2] != ""){
                                    declareTheWinner(main_array[i][j]);
                                }
                            }
                        }
                    }
                }
            }
            
            if(i < 3){
                if(main_array[i][j] == main_array[i + 1][j] && main_array[i][j] != ""){  // vertical 4 check
                    if(main_array[i + 1][j] == main_array[i + 2][j] && main_array[i + 1][j] != ""){
                        if(main_array[i + 2][j] == main_array[i + 3][j] && main_array[i + 2][j] != ""){
                            declareTheWinner(main_array[i][j]);
                        }
                    }
                }
            }

            if(i + 1 < main_array.length && j + 1 < main_array[i].length){
                if(main_array[i][j] == main_array[i + 1][j + 1] && main_array[i][j] != ""){  //    cross ltr check
                    if(i + 2 < main_array.length && j + 2 < main_array[i].length){
                        if(main_array[i + 1][j + 1] == main_array[i + 2][j + 2] && main_array[i + 1][j + 1] != ""){
                            if(i + 3 < main_array.length && j + 3 < main_array[i].length){
                                if(main_array[i + 2][j + 2] == main_array[i + 3][j + 3] && main_array[i + 2][j + 2] != ""){
                                    declareTheWinner(main_array[i][j]);
                                }
                            }
                        }
                    }
                }
            }
            
            if(i + 1 < main_array.length && j - 1 > -1){
                if(main_array[i][j] == main_array[i + 1][j - 1] && main_array[i][j] != ""){  //    cross rtl check
                    if(i + 2 < main_array.length && j - 2 > -1){
                        if(main_array[i + 1][j - 1] == main_array[i + 2][j - 2]  && main_array[i + 1][j - 1] != ""){
                            if(i + 3 < main_array.length && j - 3 > -1){
                                if(main_array[i + 2][j - 2] == main_array[i + 3][j - 3] && main_array[i + 2][j - 2] != ""){
                                    declareTheWinner(main_array[i][j]);
                                }
                            }
                        }
                    }
                }
            }  
        }
    }
}

function declareTheWinner(color){
    if(color == 'yellow'){
        var player_name = $('.player1_name h2').html();
        var color_num = "#ffd12a";
    }else{
        var player_name = $('.player2_name h2').html();
        var color_num = "#ec2424";
    }
    $('.winner_circle').css("background-color",color_num);
    $('#winner_modal').find('.modal-body .winner_name').html(player_name);
    $('#winner_modal').modal('show');

}

function checkForFullBoard(main_array){
    var full_board_check = 0;
    for(var i = 0; i < main_array.length; i++){       
        for(var j = 0; j < main_array[i].length; j++){
            if(main_array[i][j] != ""){
                full_board_check = 1;
            }else{
                full_board_check = 0;
                break;
            }
        }
        if(full_board_check == 0){
            break;
        }
    }

    if(full_board_check == 1){
        alert('Game over');
        resetGame();
    }
}

function resetGame(){
    play_now = 1;
    main_array = buildStartArray();
    buildGameTable(main_array);
}