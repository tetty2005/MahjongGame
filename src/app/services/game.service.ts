import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameMode } from '../enums/game-mode.enum';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  public modeChanged: Subject<GameMode> = new Subject<GameMode>();
}
