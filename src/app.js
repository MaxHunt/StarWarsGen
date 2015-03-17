/**
 * Welcome to Pebble.js!
 *
 * A quote generator on gesture.
 * By Max Hunt - 609556
 * Date - 15/01/2015
 */
//include Accel Pebble Libary
var Accel = require('ui/accel');
//include Gebble Libary
var Gebble = require('Gebble');
//include starwars quotes
var starwars = require('starwars');
//iniate acceleometer
Accel.init();
//include UI Pebble Libary
var UI = require('ui');
//get vector Pebble Libary
var Vector2 = require('vector2');
//Screen for real time results
var QuoteScreen = new UI.Window();
//Elements for AccelerometerScreen
var TitleText = new UI.Text({ position: new Vector2(0,0), size: new Vector2(144, 168) });
//CountersText
var QuoteText = new UI.Text({ position: new Vector2(0,25), size: new Vector2(144, 168) });
//QuoteScreen varible
var inQuoteScreen = false;
//set the accelerometer values
Accel.config({
   rate: 25,
   sample: 5,
   subscribe: false
});
//start App screen
var main = new UI.Card({   
   icon: 'images/menu_icon.png',
   subtitle: 'Star Wars Gen',
   body: 'Press Select to start and then move your the watch to genrate a Star Wars Quote.',
   scrollable: true
});
//gestures 
var shake = [[{x:3000,y:3000,z:3000,name:"shake"},{x:100,y:100,z:100}],[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}],[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}]];//,[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}]];
var shakeX =[[{x:4000,y:4000,z:4000,name:"shakeX"},{x:1100,y:0,z:0}]];
var shakeY =[[{x:4000,y:4000,z:4000,name:"shakeY"},{x:0,y:1100,z:0}]];
var shakeZ =[[{x:4000,y:4000,z:4000,name:"shakeZ"},{x:0,y:0,z:1100}]];
var gestures = [shake,shakeX,shakeY,shakeZ];
//start APP
console.log("App started");
var opt = {debug:true, delay:3000, gestures:gestures};
Gebble.init(opt);
main.show();
main.on('click', 'select', onClick);
//Start quote generator
function onClick(e) {
   console.log('Entered QuoteScreen');
   TitleText.text('Your Quote:');
   QuoteScreen.insert(0,TitleText);
   console.log("Title text added");
   QuoteScreen.show();
   inQuoteScreen = true;
   QuoteScreen.on('click','back',onAccelBack);
   QuoteScreen.on('accelData', onPeek);       
}
//Close Screen and Stop loop
function onAccelBack(){
   console.log('Close Screen and Stop Loop');
   inQuoteScreen = false;
   QuoteScreen.hide();   
}
//Get Values for Acelerometer
function onPeek(e){
   if (inQuoteScreen === true){
      var detection = Gebble.start(e);
      console.log(detection);
      insertElements(detection);   
      }     
}
//Insert onto screen
function insertElements(detection) {
   if (detection[0]===true){
      var Quote = starwars.get();
      QuoteText.text(Quote);
      QuoteScreen.insert(1,QuoteText);
   }
   QuoteScreen.show();
}