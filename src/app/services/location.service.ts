import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public connection: boolean = false;

  //Servicio para obtener la posición del telefono

  constructor() { }
  async getPosition(){
    
    return await Geolocation.getCurrentPosition();

  }

}
