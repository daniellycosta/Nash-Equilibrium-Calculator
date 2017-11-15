var formPlace = document.getElementById("form")
var resultsPlace = document.getElementById("result")

//RETURNS THE ACTION 1 PROBABILITY
//FOR ACT2 PROB DO 1 - ACT1 PROB
function calcProbAct1(prevchoices, values){ 
	var nChoices = prevchoices.length;       
	var nAct1 = 0;

	for(var i=0; i<nChoices; i++){
		if (prevchoices[i] == values[0]){
			nAct1++;
		}
	}

	return (nAct1/nChoices);
}

function bestChoice(enemyValues,enemyProbs,playerValues){
	var lessEnemyProb;
	var enemyAction;

	//IT CHOOSES A RANDON NUMBER BETWEEN 0-1 AND ROUND IT TO ONE DIGIT AND ONE DECIMAL
	var randProb = (Math.random() * 1);
   	randProb = randProb.toFixed(1);

   	//IT DISCOVERS WHICH CHOICE THE OPPONENT WILL DO LESS LIKELY
   	if(enemyProbs[1] < (1-enemyProbs[1])){
   		lessEnemyProb = enemyProbs[1];
   		enemyAction = 0;
   	}
   	else{
   		lessEnemyProb = (1-enemyProbs[1]);
   		enemyAction = 1;
   	}

   	if(randProb<=lessEnemyProb){
   		//SO THE PLAYER WILL CHOOSE THE BEST CHOICE CONSIDERING THAT THE ANOTHER ONE
   		//HAD SELECTED THE ACTION THAT HAVE A LESS PROBABILITY

   	}
}

function getNashEq(valuesP1,valuesP2){
	var nTurns = 1;
	var p1Choice, p2Choice;
	var p1PrevChoices,p2PrevChoices;
	var p1ProbsAct1 = [0,0],p2ProbsAct1 = [0,0]; //ANTERIOR AND ACTUAL PROBABILITIES

	if(nTurns==1){
		//PLAYERS CHOOSING THEIR FIRST MOVE RANDOMLY
		p1Choice = Math.floor(Math.random()*2); //RANDOM NUMBER BETWEEN 0 AND 1
		p2Choice = Math.floor(Math.random()*2);
		
		p1PrevChoices.push(p1Choice);
		p2PrevChoices.push(p2Choice);
		
		p1ProbsAct1[nTurns-1] = 1;
		p2ProbsAct1[nTurns-1] = 1;
		
		nTurns++;
			
		//DEBUG
		console.log(p1Choice);
		console.log(p2Choice);
	}
	else{

	}
}

function getFormValues(){
	var p1Actions = [document.getElementById("Pl1Action1").value, document.getElementById("Pl1Action2").value];
	var p2Actions = [document.getElementById("Pl2Action1").value, document.getElementById("Pl2Action2").value];
	var p1Values = [document.getElementById("Pl1Value1").value, document.getElementById("Pl1Value2").value];
	var p2Values = [document.getElementById("Pl2Value1").value, document.getElementById("Pl2Value2").value];
	var myTable = "<div class='container' id = 'table'>" 
	myTable+="<div class='row'>"
	myTable+="<div class='col-xs-12'>"
	myTable+="<h2> Results: </h2>"
	myTable+="<h3 style = 'text-align: center'>Player 2</h3>"
	myTable+="</div>"
	myTable+="<div class='col-xs-2'>"
	myTable+="<h3 class = 'rotate'>Player 1 </h3>"
	myTable+="</div>"
	myTable+="<div class='col-xs-10'>"    
	myTable+= "<table class='table table-striped'>"
	myTable+="<tr>"
	myTable+= "<th> - </th>"
	myTable+="<th>" + p2Actions[0] + "</th>"
	myTable+= "<th>" + p2Actions[1]+"</th>"
	myTable+="</tr>"
	myTable+="<tr>"
	myTable+="<th>" + p1Actions[0] + "</th>"
	myTable+="<td>" + p1Values[0] + ", " + p2Values[0] +"</td>"
	myTable+="<td>" + p1Values[0] + ", " + p2Values[1] +"</td>"
	myTable+="</tr>"
	myTable+="<tr>"
	myTable+="<th>" + p1Actions[1] + "</th>"
	myTable+="<td>" + p1Values[1] + ", " + p2Values[0] +"</td>"
	myTable+="<td>" + p1Values[1] + ", " + p2Values[1] +"</td>"
	myTable+="</tr>"
	myTable+="</table>"
	myTable+="</div>"
	myTable+="</div>"
	myTable+="</div>"

	config.innerHTML = myTable;
	getNashEq(p1Actions,p2Actions,p1Values,p2Values);
 	
	//DEBUG
	console.log(p1Actions)
	console.log(p2Actions)
	console.log(p1Values)
	console.log(p2Values)
}
