import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
})
export class IncrementerComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() btnClass: string = 'btn-primary';
  @Input('valor') progress: number = 40;
  @Output('valor') valueOut: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.valueOut.emit(100);
      return (this.progress = 100);
    }
    if (this.progress <= 0 && value < 0) {
      this.valueOut.emit(0);
      return (this.progress = 0);
    }

    this.progress = this.progress + value;
    return this.valueOut.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.valueOut.emit(this.progress);
  }
}
