import {Component, Input, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input('time') input;

  output: string;

  constructor() { }

  ngOnInit(): void {
    this.output = this.transform(this.input);
    interval(1000).pipe(take(this.input)).subscribe(() => {
      this.input = this.input - 1;
      this.output = this.transform(this.input);
    });
  }

  transform(value: any): any {
    const days = Math.floor(value / 60 / 60 / 24);
    const hours = Math.floor(value / 60 / 60) % 24;
    const minutes = Math.floor(value / 60) % 60;
    const seconds = value % 60;
    const elements = [];
    if (days !== 0) {
      elements.push(days);
    }
    if (days !== 0 || hours !== 0) {
      elements.push(hours);
    }
    if (days !== 0 || hours !== 0 || minutes !== 0) {
      elements.push(minutes);
    }
    if (days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0) {
      elements.push(seconds);
    }
    if (elements.length === 0) {
      return 'fertig';
    }
    const converted = elements.map(e => this.padding(e)).join(':');
    return converted;
  }

  private padding(time) {
    return time < 10 ? '0' + time : time;
  }

}
