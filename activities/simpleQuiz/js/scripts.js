var wordList;
var currentAnswer;

$.getJSON( "../../data/completely-pan-romance.json", function(json) {
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

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

function nextQuestion() {
  var question = getWordSet($('#lang1').val(),$('#lang2').val());
  var answerButtons = [1,2,3,4];
  answerButtons = shuffle(answerButtons); 
  for (i = 0; i < 4; i++) {
    eval("$('#a"+answerButtons[i]+"').html(question.answers["+i+"])");
  }
  $('#question').html(question.question);
  currentAnswer = question.correct;
}

// Event listners
$("#startGame").click(function() { nextQuestion() });

$(".answer").click(function() {
  if($(this).html()==currentAnswer){
    $('#result').html('Right!');
  } else {
    $('#result').html('Wrong');
  }
  nextQuestion();
});
