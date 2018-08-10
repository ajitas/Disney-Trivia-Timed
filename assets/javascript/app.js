//data structure to store the information about the questions
var quiz = [
    {question:"Which is the deepest lake in US?",
    options:["Lake Michigan","Crater Lake","Lake Tahoe","Lake Clark"],
    answer:"Crater Lake",
    url:"https://upload.wikimedia.org/wikipedia/commons/5/5b/Wizard_Island%2C_Crater_Lake_01.jpg"},
    {question:"Which is the largest state in US?",
    options:["Alaska","California","New Mexico","Arizona"],
    answer:"Alaska",
    url:"https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg"},
    {question:"Who was the third president of US?",
    options:["Andrew Jackson","James Monroe","Thomas Jefferson","George Washington"],
    answer:"Thomas Jefferson",
    url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29.jpg/800px-Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29.jpg"},
    {question:"Which is the least populated state in US?",
    options:["Rhode Island","Delaware","North Dakota","Wyoming"],
    answer:"Wyoming",
    url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/1000px-Flag_of_Wyoming.svg.png"},
    {question:"Which is the largest art meuseum in US?",
    options:["National Gallery of Art","Minneapolis Institute of Art","Metropolitan Museum of Art","San Francisco Museum of Modern Art"],
    answer:"Metropolitan Museum of Art",
    url:"https://media.architecturaldigest.com/photos/5a4e7d816d2c3f0f3ec6d475/master/pass/met%20museum.jpg"},
    {question:"Which is the largest baseball stadium in US?",
    options:["Coors Field, Denver","Safeco Field, Seattle","AT&T Park, SF","Dodger Stadium, LA"],
    answer:"Dodger Stadium, LA",
    url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Dodger_Stadium_field_from_upper_deck_2015-10-04.jpg/1024px-Dodger_Stadium_field_from_upper_deck_2015-10-04.jpg"},
    {question:"Which is the most populated state in US?",
    options:["Florida","California","New York","Texas"],
    answer:"California",
    url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/900px-Flag_of_California.svg.png"},
    {question:"Which is the hottest state in US?",
    options:["Florida","Texas","Arizona","Georgia"],
    answer:"Florida",
    url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/750px-Flag_of_Florida.svg.png"}
    
];

//global counters
var currentTime =20;
var updateTime;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var currentQuestion = 0;

//goes to the start page and resets the game
function resetGame(){
    //show and hide appropriate divs
    $("#start-game").show();
    $("#time-remaining").hide();
    $("#question-area").hide();
    $("#evaluation-area").hide();
    $("#result").hide();
    $("#correct-answer").hide();
    $("#restart-game").hide();

}

//shows the next question when the user answers current one or time is up
function showNextQuestion(){

    //reset timer for the next question
    currentTime = 20;

    //clear the previous interval
    clearInterval(updateTime);

    //clear the time div and show the new time
    $("#time-remaining > p").remove();
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");
    $("#time-remaining").css("color","black");

    //start running the timer
    updateTime = setInterval(decrementTime,1000);

    //clear the current question
    $("#question-area > div").remove();

    //make a new div for the next question
    var questionDiv = $("<div>");
    questionDiv.html("<h4>"+ parseInt(currentQuestion+1) + ". " +quiz[currentQuestion]["question"]+"</h4>");

    //show the new question div in the question-area
    $("#question-area").append(questionDiv);

    //for each of the four options
    for(var j =0; j<4 ;j++){

        //create a new div with id=option1,option2.. and add class options to it
        var optionDiv = $("<div>");
        optionDiv.attr("id", "option"+parseInt(j+1));
        optionDiv.attr("class", "options");

        //give value and text of the option to the newly created div
        optionDiv.val(quiz[currentQuestion]["options"][j]);
        optionDiv.html("<h4>"+quiz[currentQuestion]["options"][j]+"</h4>");
        
        //append it to the question-area after the question
        $("#question-area").append(optionDiv);

        //show the question area and hide the previous question's result
        $("#question-area").show();
        $("#result").hide();
    }
    $(".options").on("click", function(){
        //shows the result for the current question after clicking any option
        showResult($(this)[0].textContent);

    });
}

//shows result of the current question after clicking any option or when time is up
function showResult(currentUserAnswer){

    //stop the timer
    clearInterval(updateTime);

    //clear the last question's result
    $("#result").empty();

    //create a new for the result
    var resultDiv = $("<div>");

    //if user's answer is correct
    if(quiz[currentQuestion]["answer"] ===  currentUserAnswer){
        //increase the correct counter
        correct++;

        //show the result for the current question
        resultDiv.append("<p>Correct!</p>");
    }
    //if user didn't answer
    else if (!currentUserAnswer)
    {
        //increase the unanswered counter
        unanswered++;
        //show the result for the current question also show the correct answer
        resultDiv.append("<p>Time up!!</p>");
        resultDiv.append("<p>"+ "The correct answer was: " +quiz[currentQuestion]["answer"]+  "</p>");
    }
    //if user gave incorrect answer
    else{
        //increase the incorrect counter
        incorrect++;
        //show the result for the current question also show the correct answer
        resultDiv.append("<p>Oops!!</p>");
        resultDiv.append("<p>"+ "The correct answer was: " +quiz[currentQuestion]["answer"]+  "</p>");
    }
    var newImage = $("<img>");
    newImage.attr("src",quiz[currentQuestion]["url"]);
    newImage.css("height","200px");
    newImage.css("width","200px");
    resultDiv.append(newImage);

    //append the new resultDiv to the result div
    $("#result").append(resultDiv);

     //hide the question area and show the result
    $("#question-area").hide()
    $("#result").show();

    //increase the question counter
    currentQuestion++;
    //if this is the last question
    if(currentQuestion === quiz.length){
        //show final evaluation after waiting for 2 second
        setTimeout(showFinalEvaluation,2000);
    }
    //if it is not the last question
    else{
        //show next question after 2 second
        setTimeout(showNextQuestion,2000);
    }
}

//shows final evaluation of how you did after you go through all questions
function showFinalEvaluation(){

    //create a new div for showing number of questions answered correctly
    var correctDiv = $("<div>");
    //show the number in this div
    correctDiv.html("Correct Answers: " + correct);

     //create a new div for showing number of questions answered incorrectly
    var incorrectDiv = $("<div>");
    //show the number in this div
    incorrectDiv.html("Incorrect Answers: " + incorrect);

     //create a new div for showing number of questions unanswered
    var unansweredDiv = $("<div>");
    //show the number in this div
    unansweredDiv.html("Unanswered: " + unanswered);

    //remove any evaluation from previous game
    $("#evaluation-area > div").remove();

    //append the three newly created divs to the evaluation-area
    $("#evaluation-area").append(correctDiv);
    $("#evaluation-area").append(incorrectDiv);
    $("#evaluation-area").append(unansweredDiv);

    //show evaluation div
    $("#evaluation-area").show();
    //hide the result of the last question
    $("#result").hide();
    //show the restart game div
    $("#restart-game").show();
}

//decrements the time remaining every second
function decrementTime(){
    //decrement the current time by 1 second
    currentTime--;
    //remove the previous time from the time-remaining div
    $("#time-remaining > p").remove();
    //add the new time to the time-remaining div
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");

    if(currentTime <= 5)
    {
        $("#time-remaining").css("color","red");
    }
    //if time becomes 0, your time is up and the result of the current question is shown
    if(currentTime === 0){
        showResult();
    }
}
//converts the time into required format to show in the time-remaining div
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
    //resets the game when page loads
    resetGame();
});

//on click of start-game div
$("#start-game").on("click",function(){
    $("#start-game").hide();
    //show the question-area
    $("#time-remaining").show();
    $("#question-area").show();
    //start the timer
    $("#time-remaining").append("<p>" + timeConvert(currentTime)+"</p>");
    //show next question
    showNextQuestion();
});

//when user clicks restart game div
$("#restart-game").on("click", function(){
    //resets all the counters
    currentTime =20;
    updateTime;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    currentQuestion = 0;
    //show/hide appropriate areas
    $("#question-area").show();
    $("#evaluation-area").hide();
    $("#restart-game").hide();
    //show next i.e first question
    showNextQuestion();

});

