/**
 * Toggles progressBar visibility between hidden or not hidden
 */
function toggleProgressBar()
{
	const progressBar = document.getElementById("mainProgressBar");

	const barHidden =  progressBar.getAttribute("hidden");

	if(barHidden === "hidden")
	progressBar.removeAttribute("hidden");
	else
		progressBar.setAttribute("hidden","hidden");
}

/**
 * Checks if the input values are correct.
 * If not, then indicates the reason in the validation field
 * @param {String} quantity 
 * @param {String} goal 
 * @param {Label} errorLabel: Reference to validation field
 */
function checkValues(quantity,goal,errorLabel)
{
	let correctValues = true;
	let validationMessage = "";

	if(quantity == "" || isNaN(quantity) || quantity < 0 )
	{
		correctValues = false;
		validationMessage = "Please input a valid quantity value";
	} 
	else if(goal == "" ||  isNaN(goal) || goal < 0)
	{
		correctValues = false;
		validationMessage = "Please input a valid goal value";
	}
	else if(Number(quantity) > Number(goal))
	{
		correctValues = false;
		validationMessage = "Goal must be greater or equal than quantity";
	}


	errorLabel.innerHTML = validationMessage;
	return correctValues;
}

/**
 * Updates the progress using the user's input
 */
function updateProgress()
{
	const quantity = document.getElementById("quantityInput").value;
	const goal = document.getElementById("goalInput").value;
	const errorLabel = document.getElementById("progressValidationLabel");

	if(checkValues(quantity,goal,errorLabel))
	{
		//Updates the width of the colored div in order to show the progress
		let newProgress;
		if(Number(quantity) != 0)
			newProgress = Number(quantity) / Number(goal);
		else
			newProgress = 0;
		
		const progressBar = document.getElementById("mainProgressBar");
		const progressDiv = progressBar.getElementsByClassName("progress");

		if(progressDiv != null)
			progressDiv[0].style.width = (newProgress * 100) + "%"; 

		//Updates de progress label
		const progressLabel = document.getElementById("progressLabel");
		progressLabel.innerHTML = "Actual progression: " + quantity +"/" + goal + ": " + (newProgress * 100) + "%";
	}
}


const checkBarInput = document.getElementById("progressBarHideInput");
checkBarInput.addEventListener("click",toggleProgressBar);

const buttonInput = document.getElementById("progressInputButton");
buttonInput.addEventListener("click",updateProgress);

