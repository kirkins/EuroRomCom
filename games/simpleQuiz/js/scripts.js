var wordList;
var currentAnswer;

$.getJSON( "../../data/panrom.json", function(json) {
  wordList = json;
});

function getWordSet(lang1, lang2) {
  var wordSet = {};
  wordSet.answers = [];
  for (i = 0; i < 4; i++) {
    var random = Math.floor(Math.random() * wordList.length);
    wordSet.answers[i] = eval("wordList["+random+"]."+lang2);
    if(i==0){
      wordSet.question = eval("wordList["+random+"]."+lang1);
      wordSet.correct = wordSet.answers[i];
    }
  }
  return wordSet;
}

// Event listners
$("#startGame").click(function() {
  var question = getWordSet($('#lang1').val(),$('#lang2').val());
  for (i = 0; i < 4; i++) {
    eval("$('#a"+(i+1)+"').html(question.answers["+i+"])");
  }
  $('#question').html(question.question);
  currentAnswer = question.correct;
});

$(".answer").click(function() {
  if($(this).html()==currentAnswer){
    alert("correct");
  } else {
    alert("false");
  }
});
