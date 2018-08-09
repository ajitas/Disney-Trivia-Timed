var quiz = [
    {question:"what is 2+2?",
    options:[4,6,8,9],
    answer:"4"},
    {question:"what is 20-10?",
    options:[4,6,8,10],
    answer:"10"},
    {question:"what is 2*7?",
    options:[4,14,8,9],
    answer:"14"},
    {question:"what is 6*6?",
    options:[4,6,36,9],
    answer:"36"},
    {question:"what is 2+2?",
    options:[4,6,8,9],
    answer:"4"},
    {question:"what is 20-10?",
    options:[4,6,8,10],
    answer:"10"},
    {question:"what is 2*7?",
    options:[4,14,8,9],
    answer:"14"},
    {question:"what is 6*6?",
    options:[4,6,36,9],
    answer:"36"}
];

var currentTime =10;
var updateTime;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var currentQuestion = 0;

function resetGame(){
    $("#start-game").show();
    $("#time-remaining").hide();
    $("#question-area").hide();
    $("#evaluation-area").hide();
    $("#result").hide();
    $("#correct-answer").hide();
    $("#restart-game").hide();

}

function showNextQuestion(){
    currentTime = 10;
    clearInterval(updateTime);
    $("#time-remaining > p").remove();
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");
    updateTime = setInterval(decrementTime,1000);
    $("#question-area > div").remove();

    var questionDiv = $("<div>");
    questionDiv.html(currentQuestion+1 + ". " +quiz[currentQuestion]["question"]);
    $("#question-area").append(questionDiv);
    for(var j =0; j<4 ;j++){

        var optionDiv = $("<div>");
        optionDiv.attr("id", "option"+parseInt(j+1));
        optionDiv.attr("class", "options");
        optionDiv.val(quiz[currentQuestion]["options"][j]);
        optionDiv.text(quiz[currentQuestion]["options"][j]);
        
        $("#question-area").append(optionDiv);
        $("#question-area").show();
        $("#result").hide();
    }
    $(".options").on("click", function(){
        console.log($(this));
        console.log($(this)[0].textContent);
        showResult($(this)[0].textContent);

    });
}

function showResult(currentUserAnswer){
    clearInterval(updateTime);
    $("#result").empty();

    var resultDiv = $("<div>");
    if(quiz[currentQuestion]["answer"] ===  currentUserAnswer){
        correct++;
        resultDiv.append("<p>Correct!</p>");
    }
    else if (!currentUserAnswer)
    {
        unanswered++;
        resultDiv.append("<p>Time up!!</p>");
        resultDiv.append("<p>"+ "The correct answer was: " +quiz[currentQuestion]["answer"]+  "</p>");
    }
    else{
        incorrect++;
        resultDiv.append("<p>Oops!!</p>");
        resultDiv.append("<p>"+ "The correct answer was: " +quiz[currentQuestion]["answer"]+  "</p>");
    }
    $("#result").append(resultDiv);
    $("#question-area").hide()
    $("#result").show();
    currentQuestion++;
    if(currentQuestion === quiz.length)
        setTimeout(showFinalEvaluation,1000);
    else
        setTimeout(showNextQuestion,1000);
}

function showFinalEvaluation(){
    var correctDiv = $("<div>");
    correctDiv.html("Correct Answers: " + correct);

    var incorrectDiv = $("<div>");
    incorrectDiv.html("Incorrect Answers: " + incorrect);

    var unansweredDiv = $("<div>");
    unansweredDiv.html("Unanswered: " + unanswered);

    $("#evaluation-area > div").remove();
    $("#evaluation-area").append(correctDiv);
    $("#evaluation-area").append(incorrectDiv);
    $("#evaluation-area").append(unansweredDiv);

    $("#evaluation-area").show();
    $("#result").hide();
    $("#restart-game").show();
}

function decrementTime(){
    currentTime--;
    $("#time-remaining > p").remove();
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");
    if(currentTime === 0){
        showResult();
    }
}

function timeConvert(currentTime){
    var minutes = Math.floor(currentTime / 60);
    var seconds = currentTime - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
}

$(document).ready(function(){
    resetGame();
});

$("#start-game").on("click",function(){
    $("#start-game").hide();
    $("#time-remaining").show();
    $("#question-area").show();
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");
    showNextQuestion();
});

$("#restart-game").on("click", function(){
    currentTime =10;
    updateTime;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    currentQuestion = 0;
    $("#question-area").show();
    $("#evaluation-area").hide();
    $("#restart-game").hide();
    showNextQuestion();

});

