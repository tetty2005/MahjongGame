import { Component, OnInit } from '@angular/core';
import { Card } from './card/card.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private openCard: Card;
  public openCardsAmount = 0;
  public cards: Card[] = [];

  constructor() { }

  ngOnInit() {
    this.generateCards();
  }

  private generateCards(): void {
    const numbers = new Set();
    const cards: Card[] = [];

    while (numbers.size < 15) {
      numbers.add(Math.floor(Math.random() * 50) + 1);
    }
    numbers.forEach((n: number) => cards.push(new Card(n), new Card(n)));
    this.cards = this.shuffleCards(cards);
    setTimeout(() => this.showCards(), 1000);
  }

  private showCards() {
    this.openCardsAmount = 30;
    this.cards.forEach(card => card.state = 'open');
    setTimeout(() => {
      this.cards.forEach(card => card.state = 'close');
      this.openCardsAmount = 0;
    }, 4000);
  }

  private shuffleCards(cards: Card[]): Card[] {
    let currentIndex = 30;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  }

  public onClick(card: Card): void {
    this.openCardsAmount++;
    card.state = 'open';
    this.openCardsAmount > 1 ? setTimeout(() => this.compareOpenCards(card), 1000) : this.openCard = card;
  }

  private compareOpenCards(card: Card) {
    if (card.name === this.openCard.name) {
      card.state = this.openCard.state = 'guessed';
    } else {
      card.state = this.openCard.state = 'close';
    }
    this.openCard = null;
    this.openCardsAmount = 0;
  }
}
