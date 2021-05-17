var $topScorers = document.querySelector('#topScorers');
var $reset = document.querySelector('.eliminate');
var $return = document.querySelector('#returnToPage');

// this creates a button that will reset the leaderboard by clearing it from the local storage of my page
$reset.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// I am retreiving my data from local storage
var bothInputs = localStorage.getItem("bothInputs");
// JSON.parse takes strings and turns them into object
    bothInputs= JSON.parse(bothInputs);
// if my bothInputs values are not null, this for statement will create a list of the users score and intials
    if (bothInputs !== null) {
    for (var i = 0; i <bothInputs.length; i++) {
        var addList = document.createElement("li");
        addList.textContent = bothInputs[i].initials + " got " + bothInputs[i].score;
        $topScorers.appendChild(addList);
    }
 }
// this button will allow the user to easily get back to the quiz start area by switching which location they are in
$return.addEventListener("click", function(){
        window.location.replace("index.html")
    
})