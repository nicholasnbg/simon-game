$(document).ready(function(){

  //Define global variables
  var start = false;
  var currentTurn;
  var computerTurns = [];
  var computerTurnsIndex = [];
  var turnArray = [];
  var colors = [
    {
      color: 'green',
      num: 0,
      highlight:"#00FF00" ,
      unhighlight: "#195D00"
    },
    {
      color: 'red',
      num: 1,
      highlight: "#FF0000" ,
      unhighlight: "#890016"
    },
    {
      color: 'yellow',
      num: 2,
      highlight: "#FFFF00" ,
      unhighlight:"#E1C800"
    },
    {
      color: 'blue',
      num: 3,
      highlight: "#0000FF" ,
      unhighlight:"#000283"
    }
  ];

  //run functions
  fillCompTurns();
  //when start button clicked
  $('#start').click(function(){
    if(!start){
      console.log('starting game');
      start = true;
      turn = 1;
      setTimeout(function(){
        highlightTurns(turn)},700);
    }
  });

  $('.main-button').click(function(){
    if(currentTurn = 'human'){
      var choice = $(this).attr('id');
      turnArray.push(choice);
      playerTurn(choice);
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
    highlightButton(color, index);
    //check human and comp turns here
    var match = true

    //check each item in turnArray against respective compTurn.
    turnArray.forEach(function(choice, i){
      if (choice !== computerTurns[i]){
        match = false;
      }
    });
    if(match){
      if(turnArray.length == turn){
        turn ++;
        setTimeout(function(){
          highlightTurns(turn);
        },1500);
      }
    } else{
      console.log('whoops');
      wrongTurn();
    }

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

  function highlightTurns(turn){
    currentTurn = 'comp';
    let i = 0;
    var runTurns =  setInterval(function(){
      console.log(i);
      highlightButton(computerTurns[i], computerTurnsIndex[i]);
      if(i==turn-1){
        clearInterval(runTurns);
        turnArray = [];
      } else{
        i++;
      }


    },900);

    currentTurn = 'human';
  };

  function highlightButton(color, index){
      $('#'+color).css('background-color',colors[index].highlight);
      setTimeout(function(){
        $('#'+color).css('background-color',colors[index].unhighlight);
      },800);
    };
});
