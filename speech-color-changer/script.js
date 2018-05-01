var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var speeches = {
  Socrates: {
    name: "Apology",
    date: "4th Centry BC",
    guy: "Socrates",
    text: "I have a dream that one day this nation will rise up, and live out the true meaning of its creed: ‘We hold these truths to be self-evident: that all men are created equal.’ I have a dream that one day on the red hills of Georgia the sons of former slaves and the sons of former slave owners will be able to sit down together at a table of brotherhood. I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice and sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice. I have a dream that my four little children will one day live in a nation where they will not be judged by the colour of their skin, but by the content of their character. I have a dream today!"
  },
  patrickHenry: {
    name: "Give me Liberty!",
    date: "March 23, 1775",
    guy: "Patrick Henry",
    text: "It is natural to man to indulge in the illusions of hope. We are apt to shut our eyes against a painful truth -- and listen to the song of that siren, till she transforms us into beasts. Is this the part of wise men, engaged in a great and arduous struggle for liberty? Are we disposed to be of the number of those, who having eyes, see not, and having ears, hear not, the things which so nearly concern their temporal salvation? For my part, whatever anguish of spirit it may cost, I am willing to know the whole truth; to know the worst, and to provide for it. I have but one lamp by which my feet are guided; and that is the lamp of experience. I know of no way of judging of the future but by the past. And judging by the past, I wish to know what there has been in the conduct of the British ministry for the last ten years, to justify those hopes with which gentlemen have been pleased to solace themselves and the house? Is it that insidious smile with which our petition has been lately received? Trust it not, sir; it will prove a snare to your feet. Suffer not yourselves to be betrayed with a kiss. Ask yourselves how this gracious reception of our petition comports with those warlike preparations which cover our waters and darken our land. Are fleets and armies necessary to a work of love and reconciliation? Have we shown ourselves so unwilling to be reconciled that force must be called in to win back our love? Let us not deceive ourselves, sir. These are the implements of war and subjugation -- the last arguments to which kings resort. I ask gentlemen, sir, what means this martial array, if its purpose be not to force us to submission? Can gentlemen assign any other possible motive for it? Has Great Britain any enemy in this quarter of the world, to call for all this accumulation of navies and armies? No, sir, she has none. They are meant for us: they can be meant for no other. They are sent over to bind and rivet upon us those chains which the British ministry have been so long forging. And what have we to oppose to them? Shall we try argument? Sir, we have been trying that for the last ten years. Have we anything new to offer upon the subject? Nothing. We have held the subject up in every light of which it is capable; but it has been all in vain. Shall we resort to entreaty and humble supplication? What terms shall we find which have not been already exhausted? Let us not, I beseech you, sir, deceive ourselves longer. Sir, we have done everything that could be done to avert the storm which is now coming on. We have petitioned -- we have remonstrated -- we have supplicated -- we have prostrated ourselves before the throne, and have implored its interposition to arrest the tyrannical hands of the ministry and parliament. Our petitions have been slighted; our remonstrances have produced additional violence and insult; our supplications have been disregarded; and we have been spurned, with contempt, from the foot of the throne. In vain, after these things, may we indulge the fond hope of peace and reconciliation. There is no longer any room for hope. If we wish to be free -- if we mean to preserve inviolate those inestimable privileges for which we have been so long contending -- if we mean not basely to abandon the noble struggle in which we have been so long engaged, and which we have pledged ourselves never to abandon until the glorious object of our contest shall be obtained -- we must fight! -- I repeat it, sir, we must fight!! An appeal to arms and to the God of Hosts, is all that is left us! They tell us, sir, that we are weak -- unable to cope with so formidable an adversary. But when shall we be stronger? Will it be the next week or the next year? Will it be when we are totally disarmed, and when a British guard shall be stationed in every house? Shall we gather strength by irresolution and inaction? Shall we acquire the means of effectual resistance by lying supinely on our backs, and hugging the delusive phantom of hope, until our enemies shall have bound us hand and foot? Sir, we are not weak, if we make a proper use of those means which the God of nature has placed in our power. Three millions of people, armed in the holy cause of liberty, and in such a country as that which we possess, are invincible by any force which our enemy can send against us. Besides, sir, we shall not fight our battles alone. There is a just God who presides over the destinies of nations; and who will raise up friends to fight our battles for us. The battle, sir, is not to the strong alone; it is to the vigilant, the active, the brave. Besides, sir, we have no election. If we were base enough to desire it, it is now too late to retire from the contest. There is no retreat but in submission and slavery! Our chains are forged. Their clanking may be heard on the plains of Boston! The war is inevitable and let it come! I repeat it, sir, let it come! It is in vain, sir, to extenuate the matter. Gentlemen may cry, peace, peace -- but there is no peace. The war is actually begun! The next gale that sweeps from the north will bring to our ears the clash of resounding arms! Our brethren are already in the field! Why stand we here idle? What is it that gentlemen wish? What would they have? Is life so dear, or peace so sweet, as to be purchased at the price of chains and slavery? Forbid it, Almighty God! -- I know not what course others may take; but as for me, give me liberty or give me death!",
  },
  iHavADream: {
    name: "I have a Dream.",
    guy: "Martin Luther King",
    text: "I have a dream that one day this nation will rise up, and live out the true meaning of its creed: ‘We hold these truths to be self-evident: that all men are created equal.’ I have a dream that one day on the red hills of Georgia the sons of former slaves and the sons of former slave owners will be able to sit down together at a table of brotherhood. I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice and sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice. I have a dream that my four little children will one day live in a nation where they will not be judged by the colour of their skin, but by the content of their character. I have a dream today!"
  }
};
var hiscore = {
  speeches: {

  }
}
function addHiscore(type,name,score) {
  if (!hiscore.speeches.hasOwnProperty(name)) {
    hiscore.speeches[name] = [];
  }
  hiscore.speeches[name].push(score);

}
var currentText = speeches.iHavADream;
var text = getTextArray(currentText.text);
fillText();

var grammar = '#JSGF V1.0; grammar text; public <text> = ' + text.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var timer = 0;
var timerLoop=null;
var timerDone = 0;
var timerStart = -1;
var timerEl = document.getElementById("timer");
timerEl.innerHTML = "Timer starts when you start speaking!";
/*var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;*/
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 0;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.getElementById('suggestions');

function getTextArray(tx) {
  let arr = tx.split(" ");
  return arr;
}


function startTimer() {
  timer = window.performance.now() - timerStart;
  timerEl.innerHTML = Math.floor(timer / 100) / 10;
  if (timerStart>0) {
    timerLoop = window.requestAnimationFrame(startTimer);
  }
}
function stopTimer() {
  addHiscore("speeches",currentText.name,timer)
  timerStart=-1;
}

function fillText() {
  let str = "";
  for (let i = 0; i < text.length; i++) {
    str += text[i] + " ";
  }
  document.getElementById("fullText").innerHTML = str;
}

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}
recognition.onspeechstart = function(event) {
  timerStart = event.timeStamp;
  timerDone = 0;
  startTimer();
  console.log('Speech has been detected');
}
recognition.onresult = function(event) {
  timer = event.timeStamp - timerStart;
  timerEl.innerHTML = Math.floor(timer / 100) / 10;
  let finals = "";
  let interim = "";
  let last = event.results.length - 1;
  console.log(event);
  /*for (let j = 0;j<event.results.length;j++) {*/
    let trans = event.results[last][0].transcript.split(" ");
    for (let k = trans.length-1;k>=0;k--) {
      let words = trans[k].split(" ");
      for (let i = words.length-1; i >=0; i--) {
        interim += words[i] +" ";
        //let i = words.length-1;
        if (words[i].replace("-", " ").toLowerCase() == text[0].replace("-", " ").replace(/[^\w\s]|_/g, "").toLowerCase()) {
          text.splice(0, 1);
          if (text[0] == "-" || text[0] == "--") {
            text.splice(0,1);
          }
          
          if (text.length == 0) {
            console.log("You won!");
            text = getTextArray(currentText.text);
          }
          fillText();
          continue;
        }
      }
      
    }
    
  /*}*/
  /*$("#final").append("<span>"+finals+"</span>");
  */
  $("#suggestions").html(interim);

}

recognition.onspeechend = function() {
  console.log("speech has ended");
  recognition.stop();
  recognition.start();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}