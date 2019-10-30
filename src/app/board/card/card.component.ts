import { Component, OnInit, Input } from '@angular/core';
import { CardState } from '../../enums/card-state.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: number;
  public cardState = CardState;

  constructor() { }

  ngOnInit() {
  }

}
