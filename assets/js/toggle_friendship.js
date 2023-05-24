console.log(`inside the toggle friendship js claass`);
$(document).ready(function(){
    $('#friendship-button').click(function(e){
        e.preventDefault();
        const receivingUserid = $(this).attr('href').split('/').pop(); // to extract the recvr user id
        console.log(receivingUserid);
        $.ajax({
            url:$(this).attr('href'),
            type:'get',
        })
        .done(function(data){
            if(data.data.friend){ // friendship is already there
                $('#friendship-button').text('Add Friend');
                new Noty({
                    theme: 'relax',
                    text: "Added Friend",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            }else{
                $('#friendhship-button').text('Unfriend');
                new Noty({
                    theme: 'relax',
                    text: "Removed Friend",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            }
        })
    });







})