import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Satellite } from './satellite';

let sourceList: [string, string, string, string, boolean]; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    this.displayList = [];

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {

        let fetchedSatellites = data.satellites;
        
        for (let i = 0; i < fetchedSatellites.length; i++) {
          let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          this.sourceList.push(satellite);
          this.displayList = this.sourceList;
        }
      }.bind(this));
    }.bind(this));
  }
  
  search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLocaleLowerCase();
      for (let i=0; i < this.sourceList.length; i++) {
        let name = this.sourceList[i].name.toLocaleLowerCase();
        if (name.includes(searchTerm)) {
          matchingSatellites.push(this.sourceList[i]);
        }
      }
      this.displayList = matchingSatellites;
  }

}
