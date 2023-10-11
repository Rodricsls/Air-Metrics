import { Injectable } from '@angular/core';
import { IMqttMessage, MqttConnectionState, IMqttServiceOptions } from 'ngx-mqtt';
import {MqttService} from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class MymqttService {
  private ip: string = "192.168.8.40";
  private port: number=1883;
  private username:string="galiiotadmin";
  private password:string="Galileo2023$";
  private clientId: string="airmonq_s020";
  private path: string="airmon/s020";
  state:any=0;

  constructor(private ngxMqttService: MqttService) { }

  connect(){
    const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
      hostname:this.ip,
      port:this.port,
      username:this.username,
      password:this.password,
      clientId:this.clientId,
      protocol:"ws"
    };

    this.ngxMqttService.connect(MQTT_SERVICE_OPTIONS);
    this.state=this.ngxMqttService.state;
  }
}
