import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Card } from './card/card.model';
import { CardState } from '../enums/card-state.enum';
import { GameService } from '../services/game.service';
import { GameMode } from '../enums/game-mode.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class BoardComponent implements OnInit {
  private openCard: Card;
  private cardsAmount = 30;
  private showCardsDuration = 4000;
  private guessedCardsAmount: number;
  public openCardsAmount = 0;
  public cards: Card[] = [];
  public cardState = CardState;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.generateCards();
  }

  private generateCards(): void {
    const numbers = new Set();
    const cards: Card[] = [];

    while (numbers.size < this.cardsAmount / 2) {
      const randomNumber = Math.floor(Math.random() * 50) + 1;
      if (randomNumber > 1 && this.isPrime(randomNumber)) {
        numbers.add(randomNumber);
      }
    }
    numbers.forEach((n: number) => cards.push(new Card(n), new Card(n)));
    this.cards = this.shuffleCards(cards);
    this.guessedCardsAmount = 0;
    this.showCards();
  }

  private isPrime(value: number): boolean {
    for (let i = 2; i < value; i++) {
      if (value % i === 0) {
        return false;
      }
    }
    return true;
  }

  private showCards(): void {
    this.openCardsAmount = this.cardsAmount;
    this.cards.forEach(card => card.state = CardState.OPEN);
    setTimeout(() => {
      this.cards.forEach(card => card.state = CardState.CLOSED);
      this.openCardsAmount = 0;
      this.gameService.modeChanged.next(GameMode.TIME_STARTED);
    }, this.showCardsDuration);
  }

  private shuffleCards(cards: Card[]): Card[] {
    let currentIndex = this.cardsAmount;
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
    card.state = CardState.OPEN;
    this.openCardsAmount > 1 ? setTimeout(() => this.compareOpenCards(card), 1000) : this.openCard = card;
  }

  private compareOpenCards(card: Card): void {
    if (card.name === this.openCard.name) {
      card.state = this.openCard.state = CardState.GUESSED;
      this.guessedCardsAmount += 2;
    } else {
      card.state = this.openCard.state = CardState.CLOSED;
    }

    this.openCard = null;
    this.openCardsAmount = 0;

    if (this.guessedCardsAmount === this.cardsAmount) {
      this.gameService.modeChanged.next(GameMode.WIN);
    }
  }
}
