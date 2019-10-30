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
  public resultMessage = '';
  private subscription: Subscription;

  constructor(private gameService: GameService) { }

  public onStart() {
    this.subscribe();
    this.gameMode = true;
    this.resultMessage = '';
    this.gameService.modeChanged.next('on');
  }

  private subscribe() {
    this.subscription = this.gameService.modeChanged.subscribe(
      mode => {
        if (mode === 'time ended') {
          this.gameMode = false;
          this.resultMessage = 'Your time is ended!';
          this.onStop();
        }});
  }

  private onStop() {
    this.subscription.unsubscribe();
  }
}
