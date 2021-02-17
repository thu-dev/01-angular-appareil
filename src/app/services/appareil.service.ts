import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
    appareilSubject = new Subject<any[]>();

    private appareils = [];

      constructor(private httpClient: HttpClient) {}

      emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice())
      }

      getAppareilById(id:number) {
        const appareil = this.appareils.find(
          (appareilObject) => {
            return appareilObject.id == id;
          }
        );
        return appareil;
      }
      switchOnAll() {
          for(let appareil of this.appareils) {
              appareil.status = "allumer"
          }
          this.emitAppareilSubject();
      }

      switchOffAll() {
          for(let appareil of this.appareils) {
              appareil.status = "eteint"
          }
          this.emitAppareilSubject();
      }

      switchOnOne(index: number) {
          this.appareils[index].status = 'allumer';
          this.emitAppareilSubject();

      }
      switchOffOne(index: number) {
          this.appareils[index].status = 'eteint';
          this.emitAppareilSubject();
      }

      addAppareil(name: string, status: string) {
        const appareilObject = {
          id: 0,
          name: '',
          status: '',
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
      }

      saveAppareilToServer() {
        this.httpClient
        // get all input including duplicated data with POST
       // .post('https://http-client-demo-d36a6-default-rtdb.firebaseio.com/appareils.json', this.appareils) 
       .put('https://http-client-demo-d36a6-default-rtdb.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
          () => {
            console.log('termine')
          },
          (error) => {
            console.log('error')
          }
        )
      }

      getAppareilFromServer() {
        this.httpClient
        .get<any[]>('https://http-client-demo-d36a6-default-rtdb.firebaseio.com/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response;
            this.emitAppareilSubject();
          },
          (error) => {
            console.log('Erreur de changement' + error )
          }
        )
      }
}