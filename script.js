// these are my variables I am assigning to certain parts of my HTML
var $questions = document.querySelector(".questions");
var $timer = document.querySelector(".timer")
var $begin = document.querySelector("#runQuiz")
var $interval = 0;
var score = 0;
var questionIndex = 0;
// this is a list of the questions that will be asked 
const $questionList = [
    {
    question: "A .querySelector statement grabs information from which document?",
    options: ["html","css",".gitignore", ".jpg file"],
    answer: "html"
    },
    {  
    question: "Which tag is used when inserting a Javascript link into your HTML document?",
    options: ["<js>","<script>", "<link>", "<a>"],
    answer: "<script>"
    },  
    {
    question: "Where should your <script> containing the link to your JavaScript link be located?",
    options: ["Inside the head section", "Inside the title tag", "Inside the body section", "Inside any element as long as it is on your page"],
    answer: "Inside the body section"
    },
    {
    question: "Which of the following formats should you use to create a function called run?",
    options: ["function run()", "function...run()", "function === run()", "run() my function please"],
    answer: "function run()"
    },

];


//Adding timer that starts at 75 seconds upon the click of the button 


var $secondsLeft = 76;
// for each wrong answer, the user will lose 5 seconds
var deduction = 5;
// this variable will make creating ul tags easier
var createUl = document.createElement('ul');


$begin.addEventListener('click', function() {
    if ($interval === 0){
         $interval = setInterval(function () {
            $secondsLeft --;
            $timer.textContent = "Time: " + $secondsLeft;
            
     if ($secondsLeft <= 0) {
            clearInterval($interval);
            $end()
            $timer.textContent = ""
            }
        },1000);
    }
    runQs(questionIndex)
});
// this function is what will make the questions appear once the quiz is started. It will also bring up a new question each time a question is answered. 
 function runQs(questionIndex) {
    $questions.innerHTML = "";
    createUl.innerHTML = "";
// this for statement will display the questions on the page followed by their choices
    for(var i = 0; i< $questionList.length; i++) {
        var outputQ = $questionList[questionIndex].question
        var userChoice = $questionList[questionIndex].options
        $questions.textContent = outputQ;
        }
// this forEach function will create an individual button for each of the multiple choice answers
    userChoice.forEach(function (item){
        var addList = document.createElement("li")
        addList.textContent = item;
        $questions.appendChild(createUl);
        createUl.appendChild(addList);
        addList.addEventListener('click', (answerCheck));
        })
    
}
// this is my fact checker function
function answerCheck(event) {
    var element = event.target;

    if (element.matches("li")) {
        var addDiv = document.createElement("div");
        addDiv.setAttribute('id', 'addDiv');
// this if statement checks the user's selection to the actual answer, if they are right, they gain a point
        if (element.textContent == $questionList[questionIndex].answer) {
            score ++;
        addDiv.textContent = "Wow! great job! Plus one!"
// if they are wrong, they lose 5 seconds
    } else {
        $secondsLeft = $secondsLeft - deduction;
        addDiv.textContent = "Ouch! minus five seconds!"
    }

}
// this statement guarantees the application is cycling through my question index
questionIndex++;
// if my question index runs out of questions...
if (questionIndex >= $questionList.length) {
    // it activates my end function and displays the following message:
    $end(); 
    addDiv.textContent = "Looks like our time is up. Your answered " + score + " correct";
    
} else {
    runQs(questionIndex)
} 
$questions.appendChild(addDiv);
}

function $end() {
    // these statements get rid of the questions and the timer once the quiz has ended
    $questions.innerHTML = "";
    $timer.innerHTML = "done";
// this will display a message letting the user know the activity is over
    var addH1 = document.createElement("h1");
    addH1.setAttribute('id', 'addH1');
    addH1.textContent = 'Finito!';

    $questions.appendChild(addH1);

    var addP = document.createElement("p");
    addP.setAttribute('id', 'addP');

    $questions.appendChild(addP);

// this is the main part of the quiz. It takes the amount of time you had left in the quiz and produces your score based off the seconds left
if ($secondsLeft >=0) {
    var $timeLeft = $secondsLeft;
    var addP2 = document.createElement("p");
    clearInterval($interval);
    addP2.textContent= "Adding in the speed of your quiz your final score is ... " + $timeLeft;

    $questions.appendChild(addP2)


var addLabel = document.createElement("label")
addLabel.setAttribute('id', "addLabel");
addLabel.textContent= "What are your initials?"

$questions.appendChild(addLabel);
// this element is a text box that users can put their initials in
var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'initials');
    input.textContent = "";

    $questions.appendChild(input);
// once the initials have been entered the user will press submit
var submitBtn = document.createElement('button')
    submitBtn.setAttribute('type', 'Submit')
    submitBtn.setAttribute('id', 'Submit')
    submitBtn.textContent = "submit"

    $questions.appendChild(submitBtn)
// they will then be taken over to a seperate leaderboard page that will have their result as well as those who have taken the test before them
    submitBtn.addEventListener('click', function(){
        var initials = input.value;
        if (initials === null) {
            console.log("No initials entered")
        } else {
            var grandTotal = {
            initials: initials,
            score: $timeLeft 
                             }
        console.log(grandTotal)
        var bothInputs = localStorage.getItem("bothInputs")
        if (bothInputs === null){
            bothInputs = [];
        } else {
        bothInputs = JSON.parse(bothInputs);
    }
        bothInputs.push(grandTotal)
        highScoreList = JSON.stringify(bothInputs)
        // this is how the inputs remain in the system even after the page is refreshed
        localStorage.setItem("bothInputs", highScoreList)
        // here is that transfer of location to the other webpage
        window.location.replace("topScorers.html")
       }
      });
    }
}