$( document ).ready(function() {

    var questions = JSON.parse(localStorage.getItem("user_result"))
    var correct = 0;

    if (questions == null) {
        window.location="index.html"
    }

    //draw circles
    for (i = 0; i < questions.length; i++) {

        var question = questions[i]

        var isCorrect = false;

        if (question["answer"] == question["selected"]) {

            isCorrect = true;
            correct++;
        }
        

        $('.results_summ ul').append('<a class="'+isCorrect.toString()+'"><li>' + (i + 1) + '</li></a>');
    }

    $("#summary_label").html('Правильно ' + correct + ' из ' + questions.length);

    //button finish
    $("#btn_finish").click(function() {
        window.location="index.html";
    });

    //close modal window
    $("#btn_close_modal").click(function() {
        $("#modal").css("display", "none");
    });

    $('.results_summ ul li').click(function() {

        var qId = $(this).html() - 1;

        if (questions[qId]["parent_question"] != null) {
            $('#question').append(questions[qId]["parent_question"] + questions[qId]["question"]);
        }

        else {
            $('#question').append(questions[qId]["question"]);
        }
        
        $('#option_a p').html(questions[qId]["a"]);
        $('#option_b p').html(questions[qId]["b"]);
        $('#option_c p').html(questions[qId]["c"]);
        $('#option_d p').html(questions[qId]["d"]);

        $('#explanation').html(questions[qId]["explain"]);
        

        setActiveOption(questions[qId]["answer"], questions[qId]["selected"]);
        

        $("#modal").css("display", "block");
        $(".modal_wrapper").css("display", "table");
        
        
    });

    function setActiveOption(answer, selected) {

        $('.answer .option').removeClass("active");
        $('.answer .option').removeClass("incorrect");

        switch(answer) {
            case 'А':
                $('#option_a').addClass("active");
              break;
            case 'Б':
                $('#option_b').addClass("active");
              break;
            case 'В':
                $('#option_c').addClass("active");
              break;
            case 'Г':
                $('#option_d').addClass("active");
              break;
        }

        if (answer != selected) {

            switch(selected) {
                case 'А':
                    $('#option_a').addClass("incorrect");
                break;
                case 'Б':
                    $('#option_b').addClass("incorrect");
                break;
                case 'В':
                    $('#option_c').addClass("incorrect");
                break;
                case 'Г':
                    $('#option_d').addClass("incorrect");
                break;
            }
        }

    }

});