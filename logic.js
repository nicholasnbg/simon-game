$(document).ready(function(){

  //Define global variables
  var start = false;
  var currentTurn;
  var computerTurns = [];
  var computerTurnsIndex = [];
  var turnArray = [];
  var level = 1;
  var mode = 'standard';
  var errorCount = 0;
  var colors = [
    {
      color: 'green',
      num: 0,
      highlight:"#00FF00" ,
      unhighlight: "#195D00",
      sound: 'gsound'
    },
    {
      color: 'red',
      num: 1,
      highlight: "#FF0000" ,
      unhighlight: "#890016",
      sound: 'rsound'
    },
    {
      color: 'yellow',
      num: 2,
      highlight: "#FFFF00" ,
      unhighlight:"#E1C800",
      sound: 'ysound'

    },
    {
      color: 'blue',
      num: 3,
      highlight: "#0000FF" ,
      unhighlight:"#000283",
      sound: 'bsound'
    }
  ];

  //run functions
  //when start button clicked
  $('#start').click(function(){
    if(!start){
      fillCompTurns();
      console.log('starting game');
      start = true;
      turn = 1;
      updateTurnDisplay(level);
      setTimeout(function(){
        highlightTurns(turn)
      },700);
      }
    });

    $('.main-button').click(function(){
      if(currentTurn == 'human'){
        var choice = $(this).attr('id');
        turnArray.push(choice);
        playerTurn(choice);
      }
    });

    $('#strict').click(function(){
      if(start==false){
        if(mode == 'standard'){
          mode= 'strict';
          $('#strict-display').css('background-color','red');
        } else{
          mode = 'standard';
          $('#strict-display').css('background-color', '#00a74a');
        }
      } else {
        alert('Sorry, please choose game mode before starting game.');
      }

    });

    //Delcare functions
    function playerTurn(color){
      var index = 0;
      for(i=0;i<colors.length;i++){
        if(colors[i].color === color){
          index = i;
        }
      }
      //check human and comp turns here
      var match = true

      //check each item in turnArray against respective compTurn.
      turnArray.forEach(function(choice, i){
        if (choice !== computerTurns[i]){
          match = false;
        }
      });
      if(match){
        highlightButton(color, index);
        if(turnArray.length == turn){
          turn ++;
          setTimeout(function(){
            highlightTurns(turn, 'no');
          },1500);
        }
      } else{
        errorCount ++;

        wrongTurn();
      }

    };

    function wrongTurn(){
      console.log('wrong turn');
      if(currentTurn == 'human'){
        console.log('current turn human');
        if(mode=='strict'){
          console.log('wrong turn with strict on');
          alert('Game over, better luck next time!');
          start = false;
          level = 1;
          computerTurns=[];
          computerTurnsIndex=[];
          turnArray=[];
          errorCount=0;
          updateTurnDisplay(level);
        }
        else{
          console.log('wrong turn with standard');
          if(errorCount <3){
            var triesRem = 3 - errorCount;
            var errorText = 'Whoops! Try again. You have '+ triesRem + ' tries remaining!';
            alert(errorText);
            highlightTurns(turn, 'yes');
          } else if (errorCount===3){
            alert('Game over, better luck next time!');
            start = false;
            level = 1;
            computerTurns=[];
            computerTurnsIndex=[];
            turnArray=[];
            errorCount=0;
            updateTurnDisplay(level);
          }

        }

      };
    };

      function pickRandom(){
        return Math.floor(Math.random()*4);
      }

      function fillCompTurns(){
        for(i=0;i<20;i++){
          var random = pickRandom();
          computerTurns.push(colors[random].color);
          computerTurnsIndex.push(random);
        }
      };

      function highlightTurns(turn, fromError){
        currentTurn = 'comp';
        if(fromError == 'no'){
          level ++
        }
        updateTurnDisplay(level);
        if(level === 20){
          alert('You won, well done!');
          start = false;
          level = 1;
          computerTurns=[];
          computerTurnsIndex=[];
          turnArray=[];
          errorCount=0;
          updateTurnDisplay(level);
        }
        let i = 0;
        var runTurns =  setInterval(function(){
          console.log(i);
          highlightButton(computerTurns[i], computerTurnsIndex[i]);
          if(i==turn-1){
            clearInterval(runTurns);
            turnArray = [];
            setTimeout(function(){
              currentTurn = 'human';
            },700);
          } else{
            i++;
          }


        },900);

      };

      function highlightButton(color, index){
        $('#'+color).css('background-color',colors[index].highlight);
        $('#'+colors[index].sound).get(0).play();
        setTimeout(function(){
          $('#'+color).css('background-color',colors[index].unhighlight);
        },650);
      };

      function updateTurnDisplay(level){
        var string = level.toString();
        if(level<10){
          string = '0'+string;
        }
        $('#turn-display').html(string);
      }
    });
