import { CardState } from './card-state.enum';

export class Card {
  public state: CardState = CardState.CLOSED;

  constructor(public name: number) { }
}
