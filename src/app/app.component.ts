import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { GameMode } from './enums/game-mode.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public gameMode = false;
  public isTimerStarted = false;
  public resultMessage = '';
  private subscription: Subscription;

  constructor(private gameService: GameService) { }

  public onStart(): void  {
    this.subscribe();
    this.gameMode = true;
    this.resultMessage = '';
    this.gameService.modeChanged.next(GameMode.ON);
  }

  private subscribe(): void  {
    this.subscription = this.gameService.modeChanged.subscribe(
      mode => {
        switch (mode) {
          case GameMode.TIME_ENDED:
            this.onStop('Game Over!');
            break;
          case GameMode.TIME_STARTED:
            this.isTimerStarted = true;
            break;
          case GameMode.WIN:
            this.onStop('You won!');
            break;
        }
      });
  }

  private onStop(message: string): void {
    this.subscription.unsubscribe();
    this.gameService.modeChanged.next(GameMode.OFF);
    this.resultMessage = message || 'Try again!';
    this.isTimerStarted = false;
    this.gameMode = false;
  }
}
