import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private gameDuration = 120;
  private currentTime = '';
  private subscriptions: Subscription[] = [];

  constructor(private gameService: GameService) { console.log('timer constructor'); }

  ngOnInit(): void {
    this.gameService.modeChanged.subscribe(
      mode => mode === 'started' ? this.start() : this.stop()
    );
  }

  private start(): void {
    this.currentTime = this.formatValue(this.gameDuration);
    const time: Observable<number> = interval(1000);
    this.subscriptions.push(time
        .pipe(map(v => this.gameDuration - (v + 1)))
        .subscribe(v => {
          this.currentTime = this.formatValue(v);
          if (this.currentTime === '00:00') {
            this.gameService.modeChanged.next('time ended');
          }
        })
    );
  }

  private formatValue(v): string {
    const minutes = Math.floor(v / 60);
    const formattedMinutes = '' + (minutes > 9 ? minutes : '0' + minutes);
    const seconds = v % 60;
    const formattedSeconds = '' + (seconds > 9 ? seconds : '0' + seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  private stop(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.currentTime = this.formatValue(this.gameDuration);
  }
}
