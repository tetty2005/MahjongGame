import { Component } from '@angular/core';
import { GameService } from './game.service';
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
    this.gameService.modeChanged.next('on');
  }

  private subscribe(): void  {
    this.subscription = this.gameService.modeChanged.subscribe(
      mode => {
        switch (mode) {
          case 'time ended':
            this.onStop('Game Over!');
            break;
          case 'started':
            this.isTimerStarted = true;
            break;
          case 'win':
            this.onStop('You are win!');
            break;
        }
      });
  }

  private onStop(message: string): void {
    this.subscription.unsubscribe();
    this.gameService.modeChanged.next('off');
    this.resultMessage = message || 'Try again!';
    this.isTimerStarted = false;
    this.gameMode = false;
  }
}
