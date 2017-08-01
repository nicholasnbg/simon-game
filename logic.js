$(document).ready(function(){

  //Define global variables
  var start = false;
  var turn;
  var computerTurns = [];

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


  //Delcare functions
  function pickRandom(){
    return Math.floor(Math.random()*4);
  }

  function fillCompTurns(){
    for(i=0;i<20;i++){
      computerTurns.push(pickRandom());
    }
  };



});
