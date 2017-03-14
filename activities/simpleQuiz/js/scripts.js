var wordList, currentAnswer, languages, streak;
streak = 0;

function loadList() {
  clearQuestion();
  $.getJSON("../../data/"+document.getElementById("selectedList").value+".json", function(json) {
    wordList = json;
    languages = getKeys(wordList[0]);
    addOptions();
  });
}

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

var getKeys = function(obj){
 var keys = [];
 for(var key in obj){
    keys.push(key);
 }
 return keys;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function clearQuestion() {
  document.getElementById('question').innerHTML = document.getElementById('a1').innerHTML = document.getElementById('a2').innerHTML = document.getElementById('a3').innerHTML = document.getElementById('a4').innerHTML = document.getElementById('result').innerHTML = "";
}

function addOptions() {
  document.getElementById('lang1').innerHTML = document.getElementById('lang2').innerHTML = "";
  for(var i = 0; i < languages.length; i++) {
    var opt = document.createElement('option');
    opt.value = languages[i];
    opt.innerHTML = languages[i].capitalizeFirstLetter();
    document.getElementById('lang1').appendChild(opt);
  }
  for(var i = languages.length-1; i >= 0; i--) {
    var opt = document.createElement('option');
    opt.value = languages[i];
    opt.innerHTML = languages[i].capitalizeFirstLetter();
    document.getElementById('lang2').appendChild(opt);
  }
}

// Event listners
$("#startGame").click(function() { nextQuestion() });

$(".answer").click(function() {
  if($(this).html()==currentAnswer){
    $('#result').html('Right!');
    streak++;
  } else {
    $('#result').html('Wrong');
    streak = 0;
  }
  $('#streak').html(streak);
  nextQuestion();
});

document.getElementById('selectedList').addEventListener('change', loadList, false);
