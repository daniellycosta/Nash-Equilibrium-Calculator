		var formPlace = document.getElementById("config")

		function getNashEq(actions1,actions2,values1,values2){
			var nTurns = 1;
			var p1Choice, p2Choice;
			var p1PrevChoices,p2PrevChoices;
			var p1Probs = [0,0],p2Probs = [0,0];

			if(nTurns==1){
				//PLAYERS CHOOSING THEIR FIRST MOVE
				p1Choice = Math.floor(Math.random()*2);
				p2Choice = Math.floor(Math.random()*2);

				p1PrevChoices = p1Choice;
				p2PrevChoices = p2Choice;

				p1Probs[p1Choice] = 1;
				p2Probs[p2Choice] = 1;
				
				//DEBUG
				console.log(p1Choice);
				console.log(p2Choice);
				//CALC DA PROBABILIDADE A SER IMPLEMENTADA
				// var x = (Math.random() * 1);
    			//x = x.toFixed(1)
			}
			else{
				
			}
		}

		function getFormValues(){
			var p1Actions = [document.getElementById("Pl1Action1").value, document.getElementById("Pl1Action2").value];
			var p2Actions = [document.getElementById("Pl2Action1").value, document.getElementById("Pl2Action2").value];
			var p1Values = [document.getElementById("Pl1Value1").value, document.getElementById("Pl1Value2").value];
			var p2Values = [document.getElementById("Pl2Value1").value, document.getElementById("Pl2Value2").value];


		    var myTable = "<div class='container'>" 
		    myTable+="<div class='row'>"
		    myTable+="<div class='col-xs-12'>"
		    myTable+="<h3 style = 'text-align: center'>Player 2</h3>"
		    myTable+="</div>"

		    myTable+="<div class='col-xs-2'>"
			myTable+="<h3 class = 'rotate'>Player 1 </h3>"
			myTable+="</div>"

			myTable+="<div class='col-xs-10'>"    
			myTable += "<table class='table table-striped'>"
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

			getNashEq(p1Actions,p2Actions,p1Values,p2Values);

 			config.innerHTML = myTable;

			//DEBUG
			console.log(p1Actions)
			console.log(p2Actions)

			console.log(p1Values)
			console.log(p2Values)
		}