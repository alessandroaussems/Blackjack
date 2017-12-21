//OBSERVABLE PATERN
function Observable(){
	var Myself=this;
	Myself.data;
	Myself.subscribers=[];
	Myself.methods={
		subscribe:function (callback) {
			Myself.subscribers.push(callback);
		},
		 publish: function( data ) {
	    	if (typeof data !== 'undefined') {
		    	Myself.data = data;
		        for (var i = 0; i < Myself.subscribers.length; i++) {
		        	 Myself.subscribers[i](data);
		        }
	    	} else {
	    		return Myself.data
	    	}
	    }
	}
return Myself.methods
};
var cards=[
           "7C","7S","7H","7D",
           "9C","9S","9H","9D",
           "10C","10S","10H","10D",
           "AC","AS","AH","AD",
           "JC","JS","JH","JD",
           "KC","KS","KH","KD",
           "QC","QS","QH","QD",
          ];
var TOTALVALUE=new Observable();
TOTALVALUE.subscribe(checkIf21);
var WHICHCARD=new Observable();
WHICHCARD.subscribe(checkCards);
var tobeatbank=0;
var alreadypulled=[];
var inzetback=0;
var money=100;
var card=0;
var value=0;
var IMAGE_PATH="img/";
var IMAGE_EXT=".png";
var img=document.getElementsByClassName("image");
var moneyHTML=document.getElementById("money");
moneyHTML.innerHTML=money;
var gamehulp=document.getElementById("gamestatus");
var inzet=document.getElementById("inzet");
var inzetbttn=document.getElementById("inzetbttn");
var kaartbttn=document.getElementById("kaart");
var stopbttn=document.getElementById("stop");
kaartbttn.addEventListener("click",SetCard);
inzetbttn.addEventListener("click",ZetIn);
stopbttn.addEventListener("click",BeatTheBank);
GameContinue();
function GameContinue()
{
	gamestatus.innerHTML="";
	stopbttn.disabled=true;
	kaartbttn.disabled=true;
	tobeatbank=Math.floor(Math.random()*(21-15+1)+15);
	if (money<=0)
	{
		gamestatus.innerHTML="You ran out of money!"
		return;
	}
	disableInzet();
	setTimeout(SetCard, 2000);
	setTimeout(enableInzet,3000);
}
function RestartingNotWon()
{
	for (var i = 0; i < img.length; i++) {
		img[i].src=IMAGE_PATH+"empty"+IMAGE_EXT;
	}
	card=0;
	value=0;
	inzetback=0;
	GameContinue();
}
function RestartingWON()
{
	for (var i = 0; i < img.length; i++) {
		img[i].src=IMAGE_PATH+"empty"+IMAGE_EXT;
	}
	money+=inzetback;
	moneyHTML.innerHTML=money;
	card=0;
	value=0;
	inzetback=0;
	GameContinue();
}
function ZetIn()
{
	var inzetvalue=inzet.value;
	if (inzetvalue>money || inzetvalue <= 0)
	{
		alert("Nope, nice try!");
		return;
	}	
	money-=inzetvalue;
    	moneyHTML.innerHTML=money;
    	inzetback=inzetvalue*2;
    	disableInzet();
    	setTimeout(SetCard,1000);
    	setTimeout(function(){kaartbttn.disabled=false;stopbttn.disabled=false;},1500);

}
function SetCard()
{
	var cardValue=0;
    do{
        var ranndomNumber = Math.floor( Math.random() * cards.length );
    }while(checkIfInArray(ranndomNumber))
    img[card].src=IMAGE_PATH+cards[ranndomNumber]+IMAGE_EXT;
    var char=cards[ranndomNumber].charAt(0);
    switch(char) {
    case "3":
        cardValue=3;
        break;
    case "4":
         cardValue=4;
        break;
    case "5":
         cardValue=5;
        break;
    case "6":
         cardValue=6;
        break;
    case "7":
         cardValue=7;
        break;
    case "8":
         cardValue=8;
        break;
    case "9":
         cardValue=9;
        break;
    case "1":
         cardValue=10;
        break;
    case "A":
         cardValue=11;
        break;
    case "K":
         cardValue=3;
        break;
    case "J":
         cardValue=1;
        break;
    case "Q":
         cardValue=2;
        break;
}
    value+=cardValue;
    TOTALVALUE.publish(value);
    card++;
    WHICHCARD.publish(card);
    return;
}
function checkIfInArray(ranndomNumber)
{
	for (var i = 0; i < alreadypulled.length; i++) {
		alreadypulled[i]==cards[ranndomNumber]
		return true;
	}
}
function disableInzet()
{
	inzet.disabled=true;
	inzetbttn.disabled=true;
}
function enableInzet()
{
	inzet.disabled=false;
	inzetbttn.disabled=false;
}
function checkIf21()
{
	setTimeout(function(){
	if (TOTALVALUE.publish()==21)
	{
		gamestatus.innerHTML="You have 21 you win!";
		setTimeout(RestartingWON, 1000);
		return;
	}
	if (TOTALVALUE.publish()>21)
	{
		gamestatus.innerHTML="Broke...Restarting";
		setTimeout(RestartingNotWon, 1000);
	}
	},1000)
}
function checkCards()
{
setTimeout(function()
{
	if (WHICHCARD.publish()==7)
	{
		gamestatus.innerHTML="You have 7 cards you win.";
	}
	else
	{
		return;
	}
},1000)
}
function BeatTheBank()
{
	if (value>=tobeatbank)
	{
		gamestatus.innerHTML="The bank says "+tobeatbank+" wins. You have "+value+" you WIN!";
		setTimeout(RestartingWON,2000);
	}
	else
	{
		gamestatus.innerHTML="The bank says "+tobeatbank+" wins. You have "+value+" you LOOSE!.";
		setTimeout(RestartingNotWon,2000);
	}

}
