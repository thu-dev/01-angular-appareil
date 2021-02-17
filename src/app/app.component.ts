import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { promise } from 'protractor';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import 'rxjs/Rx';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value:number) => {
        this.secondes = value;
      }
    )
    // counter.subscribe(
    //   (value: number) => {
    //     this.secondes = value;
    //   },
    //   (error: any) => {
    //     console.log('erreur')
    //   },
    //   () => {
    //     console.log('complete')
    //   }
    // )

  }
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
