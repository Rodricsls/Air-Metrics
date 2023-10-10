import { Injectable } from '@angular/core';
import * as mqtt from 'mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  //credenciales
  private client: mqtt.Client;
  private ip: string = "192.168.8.40";
  private port: number=1883;
  private username:string="galiiotadmin";
  private password:string="Galileo2023$";
  private clientId: string="airmonq_s020";
  private path: string="airmon/s020"

  //conexion al servidor
  constructor() {
    this.client=mqtt.connect(`mqtt://${this.ip}:${this.port}`,{
      username:this.username,
      password:this.password,
      clientId:this.clientId,
    });
  }
}
