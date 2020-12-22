import { Component, EventEmitter, OnInit, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'zs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  logoutEvent = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    console.log('Hello');
    console.log(this.user);
  }

}
