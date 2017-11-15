var formPlace = document.getElementById("form")
var resultsPlace = document.getElementById("result")

function wasNashEqAchieved(p1Probs,p2Probs){
	var relativeErrorP1,relativeErrorP2;

	relativeErrorP1 = ( (p1Probs[1] - p1Probs[0])/p1Probs[1] )*100;
	relativeErrorP2 = ( (p2Probs[1] - p2Probs[0])/p2Probs[1] )*100;

	if(Math.abs(relativeErrorP1)<10 || Math.abs(relativeErrorP2)<10){
		return true;
	}
	else{
		return false;
	}

}

//RETURNS THE ACTION 1 PROBABILITY
//FOR ACT2 PROB DO: 1 - ACT1 PROB
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

function bestChoiceValue(enemyValues,enemyProbs,playerValues){
	var lessEnemyProb;
	var enemyActions;

	//IT CHOOSES A RANDON NUMBER BETWEEN 0-1 AND ROUND IT TO ONE DIGIT AND ONE DECIMAL
	var randProb = (Math.random() * 1);
   	randProb = randProb.toFixed(1);

   	//IT DISCOVERS WHICH CHOICE THE OPPONENT WILL DO LESS LIKELY
   	if(enemyProbs[1] < (1-enemyProbs[1])){
   		lessEnemyProb = enemyProbs[1]; //[1] BECAUSE IT'S THE CURRENT PROBABILITY
   		enemyActions = [0,1]; 
   	}
   	else{
   		lessEnemyProb = (1-enemyProbs[1]);
   		enemyActions = [1,0];
   	}

   	if(randProb<=lessEnemyProb){
   		//SO THE PLAYER WILL CHOOSE THE BEST CHOICE CONSIDERING THAT THE ANOTHER ONE
   		//HAD SELECTED THE ACTION THAT HAVE A LESS PROBABILITY (enemyAction[0])
   		if(playerValues[0]>enemyValues[ enemyActions[0] ]){
   			return playerValues[0];
   		}
   		else{
   			return playerValues[1];
   		}
   	}
   	else{
   		if (playerValues[0]>enemyValues[ enemyActions[1] ]){
   			return playerValues[0];
   		}
   		else{
   			return playerValues[1];
   		}
   	}
}

function getNashEq(valuesP1,valuesP2,actionsP1,actionsP2){
	var nTurns = 1;
	var p1Choice, p2Choice;
	var p1PrevChoices,p2PrevChoices;
	var p1ProbsAct1 = [null,null],p2ProbsAct1 = [null,null]; //ANTERIOR AND CURRENT PROBABILITIES

	if(nTurns==1){
		//PLAYERS CHOOSING THEIR FIRST MOVE RANDOMLY
		p1Choice = Math.floor(Math.random()*2); //RANDOM NUMBER BETWEEN 0 AND 1
		p2Choice = Math.floor(Math.random()*2);
		
		p1PrevChoices = p1Choice;
		p2PrevChoices = p2Choice;
		
		if(p1Choice==1){
			p1ProbsAct1[1] = 1;
		}
		else{
			p1ProbsAct1[1] = 0;
		}

		if(p2Choice==1){
			p2ProbsAct1[1] = 1;
		}
		else{
			p2ProbsAct1[1] = 0;
		}
		
		nTurns++;
			
		//DEBUG
		console.log(p1Choice);
		console.log(p2Choice);
	}
	else{

		while( !(wasNashEqAchieved(...p1ProbsAct1,...p2ProbsAct1)) ){
		
			p1Choice = bestChoiceValue(...valuesP2,...p2ProbsAct1,...valuesP1);
			p2Choice = bestChoiceValue(...valuesP1,...p1ProbsAct1,...valuesP2);

			p1PrevChoices.push(p1Choice);
			p2PrevChoices.push(p2Choice);
		
			p1ProbsAct1[0] = p1ProbsAct1[1];
			p2ProbsAct1[0] = p2ProbsAct1[1];

			if(p1Choice==1){
				p1ProbsAct1[1] = calcProbAct1(...p1PrevChoices,...valuesP1);
			}
			else{
				p1ProbsAct1[1] = 1-(calcProbAct1(...p1PrevChoices,...valuesP1));
			}

			if(p2Choice==1){
				p2ProbsAct1[1] = calcProbAct1(...p2PrevChoices,...valuesP2);
			}
			else{
				p2ProbsAct1[1] = 1-(calcProbAct1(...p2PrevChoices,...valuesP2));
			}

			nTurns++;

			//DEBUG
			console.log(p1Choice);
			console.log(p2Choice);
		}
	}

	var results = "<h2> Results: </h2>";
	results += "<ul class='list-group'>";
	results += "<li class='list-group-item'> Number of turns: " + nTurns;
	results += "</li>";
	results += "<li class='list-group-item'>Player 1 choice: " + p1ProbsAct1 + " and " + (1-p1ProbsAct1) ;
	results += "</li>";
	results += "<li class='list-group-item'>Player 2 choice: " + p2ProbsAct1 + " and " + (1-p2ProbsAct1);
	results += "</li>";
	results += "</ul>"

	resultsPlace.innerHTML = results;

}

function getFormValues(){
	var p1Actions = [document.getElementById("Pl1Action1").value, document.getElementById("Pl1Action2").value];
	var p2Actions = [document.getElementById("Pl2Action1").value, document.getElementById("Pl2Action2").value];
	
	var p1Values = [document.getElementById("Pl1Value1").value, document.getElementById("Pl1Value2").value];
	var p2Values = [document.getElementById("Pl2Value1").value, document.getElementById("Pl2Value2").value];
	
	var gameTable = "<div class='container' id = 'table'>" 
	gameTable+="<div class='row'>"
	gameTable+="<div class='col-xs-12'>"
	gameTable+="<h2> Game Table: </h2>"
	gameTable+="<h3 style = 'text-align: center'>Player 2</h3>"
	gameTable+="</div>"
	gameTable+="<div class='col-xs-2'>"
	gameTable+="<h3 class = 'rotate'>Player 1 </h3>"
	gameTable+="</div>"
	gameTable+="<div class='col-xs-10'>"    
	gameTable+= "<table class='table table-striped'>"
	gameTable+="<tr>"
	gameTable+= "<th> --- </th>"
	gameTable+="<th>" + p2Actions[0] + "</th>"
	gameTable+= "<th>" + p2Actions[1]+"</th>"
	gameTable+="</tr>"
	gameTable+="<tr>"
	gameTable+="<th>" + p1Actions[0] + "</th>"
	gameTable+="<td>" + p1Values[0] + ", " + p2Values[1] +"</td>"
	gameTable+="<td>" + p1Values[1] + ", " + p2Values[0] +"</td>"
	gameTable+="</tr>"
	gameTable+="<tr>"
	gameTable+="<th>" + p1Actions[1] + "</th>"
	gameTable+="<td>" + p1Values[1] + ", " + p2Values[0] +"</td>"
	gameTable+="<td>" + p1Values[0] + ", " + p2Values[1] +"</td>"
	gameTable+="</tr>"
	gameTable+="</table>"
	gameTable+="</div>"
	gameTable+="</div>"
	gameTable+="</div>"

	config.innerHTML = gameTable;
	getNashEq(...p1Values,...p2Values,...p1Actions,...p2Actions);
 	
	//DEBUG
	console.log(p1Actions)
	console.log(p2Actions)
	console.log(p1Values)
	console.log(p2Values)
}
