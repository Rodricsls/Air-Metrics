import { Component, OnInit } from '@angular/core';
import { BleClient, BleDevice, numberToUUID } from '@capacitor-community/bluetooth-le';

//UUID Tarjeta
const ESP_32 = '91bad492-b950-4226-aa2b-4ede9fa42f59';

//UUID caracteristica
const characteristicUUID = 'ca73b3ba-39f6-4ab3-91ae-186dc9577d99';
const descriptorUUID = numberToUUID(0x2903);

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

  data: number = 0;
  cont: number = 0;

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

  async obtenerData(){
    BleClient.read(
      this.items[0].deviceId,
      ESP_32,
      characteristicUUID
    )
    .then((characteristicValue) => {
      // Handle the characteristic value
      
      this.data = characteristicValue.getInt16(0);
    })
    .catch((error) => {
      // Handle any errors
      this.cont = this.cont + 1;
    });
  }

}
