$(document).ready(function(){
    setTimeout(function(){
        window.timeStart           = (+new Date);
        window.timeLimitHours      = 4;    /* hours */
        window.timeLimitMinutes    = 20;   /* minutes */

        var interval    = setInterval(function(){
                var timeCurrent = (+new Date),
                    timeLimit = (timeLimitHours * 60 + timeLimitMinutes) * 6e4,
                    timerElem;

                if(timeCurrent - timeStart > timeLimit){
                    clearInterval(interval);
                    var correctAnswers = 0,
                        bool;

                    $('dd input[name=user_answer]').each(function(index, elem){
                        correctAnswers += (elem.value == $('dd input.cra')[index].value);
                    });

                    bool = (correctAnswers%10 == 1 && correctAnswers%100 != 11);

                    alert('У вас ' + correctAnswers + 'правильны' + (bool?'й ответ':'х ответов') );
                } else {
                    var time = (timeLimit - (timeCurrent - timeStart)) / 1e3,
                        hours,
                        minutes,
                        secs;

                    hours   = Math.floor(time/60/60);
                    minutes = Math.floor(time/60%60);
                    secs    = Math.floor(time%60%60);

                    minutes = (minutes  < 10 ? '0':'') + minutes;
                    secs    = (secs     < 10 ? '0':'') + secs;

                    $('#timer').html(hours + ':' + minutes + ':' + secs);
                }
            }, 1e3);

        /*$(window).bind('beforeunload', function(e){
            if(!$.browser.mozilla){
                return "\
                    Внимание!\n\
                    Вы собираетесь покинуть  страницу.\n\n\
                    Подумайте еще раз!\n\
                ";
            }
        });*/
    }, 2e3);
    
    
    console.log('xyu');
});