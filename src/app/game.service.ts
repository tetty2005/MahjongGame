import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  public modeChanged: Subject<string> = new Subject<string>();
}
