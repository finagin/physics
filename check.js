XM = {
    timer: {
        /**
         * Настройка лимита времени
         */
        limit: {
            /**
             * Отведённое количество часов
             */
            hours: 4,
            /**
             * Отведённое количество минут
             */
            minutes: 0
        },

        /**
         * Timestamp начала отсчёта
         */
        start: 0,

        /**
         * Пересчёт лимита времени в timestamp
         *
         * @param {boolean} microsec - Учитывать микросекнды
         * @returns {number}
         */
        getLimit: function (microsec) {
            return (
                (
                    this.limit.hours * 60 + this.limit.minutes
                ) * 60 * (microsec ? 1e3 : 1)
            );
        },
        /**
         * Закончилось ли время
         *
         * @returns {boolean}
         */
        get isRunning() {
            return (+new Date) - this.start < this.getLimit(true);
        },

        /**
         * Magic function :)
         *
         * @returns {string} - H:MM:SS
         */
        toString: function () {
            var time = (this.getLimit(true) + this.start - (+new Date)) / 1e3,
                hours,
                minutes,
                seconds;

            hours = Math.floor(time / 60 / 60);
            minutes = Math.floor(time / 60 % 60);
            seconds = Math.floor(time % 60 % 60);

            minutes = (minutes < 10 ? '0' : '') + minutes;
            seconds = (seconds < 10 ? '0' : '') + seconds;

            return [hours, minutes, seconds].join(':');
        }
    },

    /**
     * Подсчёт результатов
     */
    checkResult: function () {
        clearInterval(this.interval);

        $('dd').each(function (index, elem) {
            var userAnswer = $(elem).find('input[name=user_answer]').val(),
                correctAnswer = $(elem).find('input.cra').val();

            if (userAnswer != correctAnswer) {
                var showRsult = $('#showRsult')
                    .append($(elem).find('.question_block'))
                    .append($(elem).find('.answer_block p').eq(correctAnswer - 1));

                if (userAnswer) {
                    showRsult
                        .append($(elem).find('.answer_block p').eq(userAnswer - 1));
                }


            }
        });

        $('.news_list')
            .css({display: 'none'});
    },

    /**
     * Обработчик setInterval'а
     */
    intervalHandler: function () {
        if (this.isReady) {
            if (this.timer.isRunning) {
                /**
                 * Show time
                 */
                $('#timer')
                    .html(this.timer + '');
            } else {
                this.checkResult();
            }
        }
    },

    /**
     * Запуск интервальной функции
     */
    interval: setInterval(function () {
        XM.intervalHandler.call(XM);
    }, 1e3),

    /**
     * Инициализация
     */
    init: function () {
        this.timer.start = (+new Date);
        this.isReady = true;
    }
};

/**
 * Запуск через две сукунды после загрузки DOM
 */
$(document).ready(function () {
    setTimeout(function () {
        XM.init();
    }, 2e3);

    $('#send_result').on('click', function () {
        XM.checkResult();
    });
});
