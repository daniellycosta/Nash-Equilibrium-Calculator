var formPlace = document.getElementById("form")
var resultsPlace = document.getElementById("result")

function wasNashEqAchieved(p1Probs,p2Probs, nTurns){
	if(nTurns>2){
		let relativeErrorP1,relativeErrorP2;

		relativeErrorP1 = ( (p1Probs[1] - p1Probs[0])/p1Probs[1] )*100.0;
		relativeErrorP2 = ( (p2Probs[1] - p2Probs[0])/p2Probs[1] )*100.0;

		//DEBUG
		console.log("relativeErrorP1");
		console.log(relativeErrorP1);
		console.log("relativeErrorP2");
		console.log(relativeErrorP2);

		if(Math.abs(relativeErrorP1)<3 && Math.abs(relativeErrorP2)<3){
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}

}

//RETURNS THE ACTION 1 PROBABILITY
//FOR ACT2 PROB DO: 1 - ACT1 PROB
function calcProbAct1(prevchoices){ 
	let nChoices = prevchoices.length;
	
	//DEBUG
	console.log("nChoices:");
	console.log(nChoices);

	
	let nAct1 = 0;

	for(var i=0; i<nChoices; i++){
		if (prevchoices[i] == 0){
			nAct1++;
		}
	}

	//DEBUG
	console.log("PROBABILITY");
	console.log(nAct1/nChoices);

	return (nAct1/nChoices);
}

function bestChoiceValue(enemyValues,enemyProbs,playerValues){

	signal = Number(playerValues[0][0])- Number(playerValues[0][1]) - Number(playerValues[1][0]) + Number(playerValues[1][1]);
	
	console.log("SIGNAL:");
	console.log(signal);
	
	if(signal>0){
		if(enemyProbs[1] > ((playerValues[1][1] - playerValues[0][1])/signal)){
			return 0 //playerActions[0] -> ACTION 1
		}
		else{
			return 1 //playerActions[1] -> ACTION 2
		}

	} else if(signal<0){
		if(enemyProbs[1] < ((playerValues[1][1] - playerValues[0][1])/signal)){
			return 0 //playerActions[0] -> ACTION 1
		}
		else{
			return 1 //playerActions[1] -> ACTION 2
		}
	}else{
		//PLAYER PROBABILITY OF CHOOSE ACTION 1 (RANDOM)
		//IT CHOOSES A RANDON NUMBER BETWEEN 0-1 
		let randPlayerProbAct1 = Math.random();
		
		//PLAYER CHOICE IN THIS CASE IS RANDOM
		let randProb = Math.random();
   		//randProb = randProb.toFixed(4);

   		if(randProb<=randPlayerProbAct1){
   			return 0 //playerActions[0] -> ACTION 1
   		} else{
   			return 1 //playerActions[1] -> ACTION 2
   		}

   	}
   }

   function getNashEq(valuesP1,valuesP2, actionsP1,actionsP2){
   	let nTurns = 1;
   	let p1Choice = null, p2Choice = null;
   	let p1PrevChoices = null,p2PrevChoices = null;
	let p1ProbsAct1 = [null,null],p2ProbsAct1 = [null,null]; //PREVIOUS AND CURRENT PROBABILITIES

	while( wasNashEqAchieved(p1ProbsAct1,p2ProbsAct1,nTurns) == false ){
		if(nTurns==1){
			//PLAYERS CHOOSING THEIR FIRST MOVE RANDOMLY
			p1Choice = Math.round(Math.random()); //RANDOM NUMBER BETWEEN 0 AND 1
			p2Choice = Math.round(Math.random());
			//Math.floor(Math.random()*(max-min)+min);
		
			p1PrevChoices = [p1Choice];
			p2PrevChoices = [p2Choice];
		
			if(p1Choice==0){
				p1ProbsAct1[1] = 1;
			}
			else if(p1Choice==1){
				p1ProbsAct1[1] = 0;
			}
			else{
				console.log("RANDOM ERRADOO 1");
			}

			if(p2Choice==0){
				p2ProbsAct1[1] = 1;
			}
			else if(p2Choice==1){
				p2ProbsAct1[1] = 0;
			}
			else{
				console.log("RANDOM ERRADOO 2");
			}
		
			nTurns++;

			//DEBUG
			console.log("nTurns");
			console.log(nTurns);
			console.log("p1Choice");
			console.log(p1Choice);
			console.log("p2Choice");
			console.log(p2Choice)
		}
		else{
		
			p1Choice = bestChoiceValue(valuesP2,p2ProbsAct1,valuesP1);
			p2Choice = bestChoiceValue(valuesP1,p1ProbsAct1,valuesP2);

			p1PrevChoices.push(p1Choice);
			p2PrevChoices.push(p2Choice);
		
			p1ProbsAct1[0] = p1ProbsAct1[1];
			p2ProbsAct1[0] = p2ProbsAct1[1];

			if(p1Choice==0){
				p1ProbsAct1[1] = calcProbAct1(p1PrevChoices);
			}
			else{
				p1ProbsAct1[1] = 1-(calcProbAct1(p1PrevChoices));
			}

			if(p2Choice==0){
				p2ProbsAct1[1] = calcProbAct1(p2PrevChoices);
			}
			else{
				p2ProbsAct1[1] = 1-(calcProbAct1(p2PrevChoices));
			}

			nTurns++;

			//DEBUG
			console.log("nTurns");
			console.log(nTurns);
			console.log("p1Choice");
			console.log(p1Choice);
			console.log("p2Choice");
			console.log(p2Choice);
		}
	}

		let results = "<h2> Results: </h2>";
		results += "<ul class='list-group'>";
		results += "<li class='list-group-item'> Number of turns: " + nTurns;
		results += "</li>";
		results += "<li class='list-group-item'>Player 1 choice: "+ p1ProbsAct1[1]*100 + "% "+actionsP1[0]+" and " + (1-p1ProbsAct1[1])*100 + "% "+actionsP1[1];
		results += "</li>";
		results += "<li class='list-group-item'>Player 2 choice: " + p2ProbsAct1[1]*100 + "% "+actionsP2[0]+" and " + (1-p2ProbsAct1[1])*100 + "% "+actionsP2[1];
		results += "</li>";
		results += "</ul>";
		results += "<button type='button' class='btn btn-secondary celulajogo' onClick='window.location.reload()'>Return</button>"

		resultsPlace.innerHTML = results;

}

function getFormValues(){
	const p1Actions = [document.getElementById("Pl1Action1").value, document.getElementById("Pl1Action2").value];
	const p2Actions = [document.getElementById("Pl2Action1").value, document.getElementById("Pl2Action2").value];
	
	const p1Values = [[document.getElementById("Pl1Value11").value, document.getElementById("Pl1Value12").value],[document.getElementById("Pl1Value21").value, document.getElementById("Pl1Value22").value]];
	const p2Values = [[document.getElementById("Pl2Value11").value, document.getElementById("Pl2Value12").value],[document.getElementById("Pl2Value21").value, document.getElementById("Pl2Value22").value]];
	
	let gameTable = "<div class='container' id = 'table'>" 
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
	gameTable+="<td>" + p1Values[0][0] + ", " + p2Values[0][0] +"</td>"
	gameTable+="<td>" + p1Values[0][1] + ", " + p2Values[0][1] +"</td>"
	gameTable+="</tr>"
	gameTable+="<tr>"
	gameTable+="<th>" + p1Actions[1] + "</th>"
	gameTable+="<td>" + p1Values[1][0] + ", " + p2Values[1][0] +"</td>"
	gameTable+="<td>" + p1Values[1][1] + ", " + p2Values[1][1] +"</td>"
	gameTable+="</tr>"
	gameTable+="</table>"
	gameTable+="</div>"
	gameTable+="</div>"
	gameTable+="</div>"

	config.innerHTML = gameTable;
	getNashEq(p1Values,p2Values,p1Actions,p2Actions);

	//DEBUG
	console.log("p1Actions:")
	console.log(p1Actions)
	console.log("p2Actions:")
	console.log(p2Actions)
	console.log("p1Values:")
	console.log(p1Values)
	console.log("p2Values:")
	console.log(p2Values)
}
