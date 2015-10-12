$(document).ready(function(){
    var timeStatr   = (+new Date),
        timeLimit   = 20, /* minutes */
        interval    = setInterval(function(){
            var timeCurrent = (+new Date);
            
            if(timeCurrent - timeStart > timeLimit * 6e4){
                clearInterval(interval);
                var correctAnswers = 0б
                bool;
                
                $('dd input[name=user_answer]').each(function(index, elem){
                    correctAnswers += ($.md5(elem.value) == $('dd input.cra')[index].value);
                });
                
                bool = (correctAnswers%10 == 1 && correctAnswers%100 != 11);
                
                alert('У вас ' + correctAnswers + 'правильны' + (bool?'й ответ':'х ответов') );
            } else {
                $('#timer').html(timeCurrent - timeStart);
            }
        }, 1e3);
});