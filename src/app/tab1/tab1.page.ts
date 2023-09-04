import { Component, OnInit, OnChanges } from '@angular/core';
import { BleClient, BleDevice } from '@capacitor-community/bluetooth-le';

const ESP_32 = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  estado: boolean = false;
  items:  BleDevice[] = [];
  deviceConnected:boolean = false;
  connected_b: string="leaf-outline";
  color_start: string="success";
  color_finish:string="danger";

  constructor() { 
  }

  async ngOnInit() {

    //Se inicializa el modulo.
    await BleClient.initialize();

    //Se manda a actualizar el estado del BT.
    this.updateBluetoothStatus();

    //Mandar a enlistar los dispositivos.
    const isEnabled = await BleClient.isEnabled();
    this.listarDispositivos(isEnabled);
  }


  //Actualizamos el estado del BT cada vez que haya un cambio.
  async updateBluetoothStatus() {
    const isEnabled = await BleClient.isEnabled();
    if (isEnabled) {
      this.estado = true;
    } else {
      this.estado = false;
    }
    this.updateBluetoothStatus();
  }

  //Boton para encender BT
  encender(){
    BleClient.openBluetoothSettings();
    this.refresh();
  }

  //Boton para apagar BT
  apagar(){
    BleClient.openBluetoothSettings();
  }

  //Boton de actualizar
  refresh(){
    this.listarDispositivos(true);
    this.items.length = 0;
  }

  async listarDispositivos(habilitada: boolean){
    if(habilitada){
      //Listamos dispositivos
      const device = await BleClient.requestDevice({services: [ESP_32], allowDuplicates: true},);
      this.items.push(device);
    }
    else{
      this.ngOnInit();
    }
  }


  //conectamos dispositivos
  async conectarDispositivo(device: BleDevice){
    try{
      await BleClient.connect(device.deviceId, (device) => this.onDisconnect());
      this.deviceConnected=true;
      this.connected_b="checkmark-circle-outline"

    }catch(error){

    }

  }


//desconectamos el dispositivo
  async DesconectarDispositivo(device: BleDevice){
    try{
      await BleClient.disconnect(device.deviceId);
      this.deviceConnected=true;
      this.connected_b="leaf-outline";

    }catch(error){

    }
  }



  async onDisconnect(){
    this.deviceConnected=false;
    this.connected_b="leaf-outline";
  }

}
