import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  altitude:any=0;
  latitude:number=0;
  longitude:number=0;
  intervalId:any=0;

  constructor(private locationService: LocationService) {}

  ngOnInit(){
    //se obtiene la posición del servicio cada 2 segundos y se asignan las coordenadas
    this.intervalId = setInterval(async ()=> {

      const position = await this.locationService.getPosition();
      this.altitude=position.coords.altitude;
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;

    }, 2000);


  }


  ngOnDestroy(){

    if(this.intervalId!=null){
      clearInterval(this.intervalId);
    }

  }


}
