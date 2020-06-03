$( document ).ready(function() {
    var BASE_URL = 'http://synak.kg/';
        
    var API = {
        login: 'api/user/login',
        book: 'api/book'
    }
    var MAX_QUESTIONS = 15


    //test variables
    var questions = []
    var questionLength = 0;
    var currentQuestion = -1;

    getBookQuestions();
    
    if (localStorage.getItem("user_id") == null) {

        login()
    }

    //ON CLICK LISTENERS

    $( "#btn_next").click(function() {

        if (questions[currentQuestion]["selected"] != undefined) {
            setQuestion();
        }
    });

    $( "#option_a").click(function() {
        clearActiveOption()
        $("#option_a .option").addClass("active")
        $("#btn_next").addClass("active")
        questions[currentQuestion]["selected"] = "А"
    });

    $( "#option_b").click(function() {
        clearActiveOption()
        $("#option_b .option").addClass("active")
        $("#btn_next").addClass("active")
        questions[currentQuestion]["selected"] = "Б"
    });

    $( "#option_c").click(function() {
        clearActiveOption()
        $("#option_c .option").addClass("active")
        $("#btn_next").addClass("active")
        questions[currentQuestion]["selected"] = "В"
    });

    $( "#option_d").click(function() {
        clearActiveOption()
        $("#option_d .option").addClass("active")
        $("#btn_next").addClass("active")
        questions[currentQuestion]["selected"] = "Г"
    });

    //FUNSTIONS
    function login() {
        $.post(BASE_URL + API.login,{ email: 'skip@mail.ru', password: 'asdfoopcip'  },
        function(data, status, jqXHR) {

                var obj = jQuery.parseJSON(data);

                //set user id to local storage
                localStorage.setItem("user_id", obj["Response"]["Data"]["id"]);
        })
    }

    function getBookQuestions() {

        var bookCode = new URLSearchParams(window.location.search).get('book_code')

        $.post(BASE_URL + API.book,{ book_code: bookCode},
        function(data, status, jqXHR) {

            var obj = jQuery.parseJSON(data);
            questions = obj["Response"]["Data"];

            questionLength = questions.length;

            if (MAX_QUESTIONS > questions.length) {
                questionLength = questions.length;
            }
            else {
                questionLength = MAX_QUESTIONS
            }

            for (i = 0; i < questionLength; i++) {
                $("#progress_bar").append('<li></li>')
            }

            //set first question
            setQuestion()
        })
    }

    function setQuestion() {

        currentQuestion += 1;

        if (currentQuestion == questionLength) {
            $('#btn_next').hide();

            setResults()
        }

        else {

            //set progress bar
            $('#progress_bar').children().eq(currentQuestion).addClass("active")

            //clear active
            clearActiveOption()

            //clear content
            $('#question').empty();
            $('#option_a > div > p').empty();
            $('#option_b > div > p').empty();
            $('#option_c > div > p').empty();
            $('#option_d > div > p').empty();
            $('#label_current_question').empty();

            $('#label_current_question').append("Вопрос: " + (currentQuestion + 1) + "/" + (questionLength + 1));

            if (questions[currentQuestion]["parent_question"] != null) {
                $('#question').append(questions[currentQuestion]["parent_question"] + questions[currentQuestion]["question"]);
            }

            else {
                $('#question').append(questions[currentQuestion]["question"]);
            }
            
            $('#option_a > div > p').append(questions[currentQuestion]["a"]);
            $('#option_b > div > p').append(questions[currentQuestion]["b"]);
            $('#option_c > div > p').append(questions[currentQuestion]["c"]);
            $('#option_d > div > p').append(questions[currentQuestion]["d"]);
        }
        
        $("#btn_next").removeClass("active")
    }

    function setResults() {

        var result = []

        for (i = 0; i < questionLength; i++) {
            result[i] = questions[i]
        }

        localStorage.setItem("user_result", JSON.stringify(result));

        window.location="results.html"
    }

    function clearValues() {
        questions = []
        questionLength = 0;
        currentQuestion = -1;
    }

    function clearActiveOption() {
        $( "#option_a .option").removeClass("active")
        $( "#option_b .option").removeClass("active")
        $( "#option_c .option").removeClass("active")
        $( "#option_d .option").removeClass("active")
    }

});

