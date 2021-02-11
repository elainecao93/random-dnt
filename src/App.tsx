import React from 'react';
import './App.css';

var maindeck_randoms = ["Skyclave Apparition", "Spirit of the Labrynith", "Phyrexian Revoker",
  "Sanctum Prelate", "Tithe Taker", "Archon of Emeria", "Luminarch Aspirant", "Remorseful Cleric",
  "Walking Ballista", "Hallowed Spiritkeeper", "Palace Jailer", "Brimaz, King of Oreskos",
  "Mirran Crusader", "Leonin Relic-Warder", "Charming Prince", "Giver of Runes", "Mangara of Corondor",
  "Thalia, Heretic Cathar"];

var sideboard_randoms = ["Mindbreak Trap", "Surgical Extraction",
  "Path to Exile", "Council's Judgment", "Rest in Peace", "Grafdigger's Cage", "Containment Priest",
  "Ethersworn Canonist", "Deafening Silence", "Gideon, Ally of Zendikar", "Cataclysm", "Armageddon",
  "Elspeth, Knight-Errant", "Karn, Scion of Urza",];

function getRandomList(is_yorion:boolean) : Map<string, number> {
  var decklist:Map<string, number> = new Map();
  var num_lands = is_yorion ? randomBetween(30, 34) : randomBetween(23, 25);

  decklist.set("Wasteland", 4)
  decklist.set("Rishadan Port", 4);
  decklist.set("Karakas", 3);
  decklist.set("Ancient Tomb", randomBetween(0, 1));
  decklist.set("Mishra's Factory", randomBetween(0, 2));
  decklist.set("Silent Clearing", randomBetween(1, 3));
  if (Math.random() < 0.2) {
    decklist.set("Snow-Covered Plains", randomBetween(0, num_lands-getCount(decklist)));
    decklist.set("Plains", num_lands-getCount(decklist));
  } else {
    if (Math.random() < 0.5) {
      decklist.set("Snow-Covered Plains", num_lands-getCount(decklist));
    } else {
      decklist.set("Plains", num_lands-getCount(decklist));
    }
  }

  decklist.set("Aether Vial", 4);
  decklist.set("Swords to Plowshares", 4)
  decklist.set("Thalia, Guardian of Thraben", 4);
  decklist.set("Mother of Runes", 4);
  decklist.set("Flickerwisp", randomBetween(2, 4));
  decklist.set("Recruiter of the Guard", randomBetween(2, 4));
  decklist.set("Stoneforge Mystic", randomBetween(3, 4));
  decklist.set("Batterskull", 1);
  decklist.set("Umezawa's Jitte", randomBetween(0, 1));
  decklist.set("Sword of Fire and Ice", randomBetween(0, 1));

  while (getCount(decklist) < (is_yorion ? 80 : 60)) {
    addToList(decklist, maindeck_randoms[randomBetween(0, maindeck_randoms.length-1)])
  }

  return decklist;
}

function getRandomSideboard(is_yorion:boolean) : Map<string, number> {
  var sideboard:Map<string, number> = new Map();
  if (is_yorion) {
    sideboard.set("Yorion, Sky Nomad", 1)
  }
  sideboard.set("Sword of Feast and Famine", randomBetween(0, 1));
  while (getCount(sideboard) < 15) {
    addToList(sideboard, sideboard_randoms[randomBetween(0, sideboard_randoms.length-1)])
  }
  return sideboard;
}

function getCount(dict:Map<string, number>): number {
  var count:number = 0;
  dict.forEach((value:number, key:string) => count+=value);
  return count;
}

function addToList(dict:Map<string, number>, elem:string) {
  var value = dict.get(elem);
  if (value && value > 3)
    return;
  dict.set(elem, value ? value+1 : 1);
}

function randomBetween(x:number, y:number):number {
  return Math.floor(Math.random()*(y-x+1))+x;
}

class DecklistElem extends React.Component<{cardName:string, cardNumber:number}, {}> {
  render() {
    if (this.props.cardNumber == 0) {
      return null;
    }
    return (
      <div>{this.props.cardNumber} {this.props.cardName}</div>
    );
  }
}

class DisplayDecklist extends React.Component<{}, {decklist:Map<string, number>, sideboard:Map<string, number>}> {
  constructor(props: Readonly<{}>) {
    super(props);
    var is_yorion:boolean = Math.random() < 0.5;
    this.state = {
      decklist: getRandomList(is_yorion),
      sideboard: getRandomSideboard(is_yorion)
    }
  }

  build() {
    var is_yorion:boolean = Math.random() < 0.5;
    this.setState(
      {
        decklist: getRandomList(is_yorion),
        sideboard: getRandomSideboard(is_yorion)
      }
      );
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          {Array.from(this.state.decklist, ([k, v]) => <DecklistElem cardName={k} cardNumber={v}/>)}
        </div>
        <div className="column">
          {Array.from(this.state.sideboard, ([k, v]) => <DecklistElem cardName={k} cardNumber={v}/>)}
        </div>
      </div>
    );
  }
}

class Activity extends React.Component<{},{}> {
  render() {
    return <DisplayDecklist/>;
  }
}

function App() {
  return (
    <Activity/>
  );
}

export default App;
