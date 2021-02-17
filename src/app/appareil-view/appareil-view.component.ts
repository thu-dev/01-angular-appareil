import { Component, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { AppareilService} from '../services/appareil.service'

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date)
      }, 2000);
    }
  );


  appareils : any[];
  appareilSubscription : Subscription;

  constructor(private appareilService : AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 2000);
  }

  ngOnInit () {
    // this.appareils = this.appareilService.appareils;
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilToServer();
  }

  onFetch() {
    this.appareilService.getAppareilFromServer();
  }
}
