import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { BleClient, BleDevice, numberToUUID } from '@capacitor-community/bluetooth-le';
import { MymqttService } from '../services/mymqtt.service';

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
  state:any=0;

  buffer: number[] = [];

  constructor(private locationService: LocationService, private mymqttService: MymqttService) {}

  ngOnInit(){
    //se obtiene la posición del servicio cada 2 segundos y se asignan las coordenadas
    this.intervalId = setInterval(async ()=> {

      const position = await this.locationService.getPosition();
      this.altitude=position.coords.altitude;
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;

    }, 2000);
    this.mymqttService.connect();
    this.state=this.mymqttService.state;
  }

  ngOnDestroy(){

    if(this.intervalId!=null){
      clearInterval(this.intervalId);
    }

  }


  start(){
   alert("Comenzo la transmision");
  }


}
