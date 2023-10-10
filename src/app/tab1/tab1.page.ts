import { Component, OnInit } from '@angular/core';
import { BleClient, BleDevice, numberToUUID } from '@capacitor-community/bluetooth-le';

//UUID Tarjeta
const ESP_32 = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

//UUID caracteristica
const characteristicUUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ble_estado: boolean = false;
  location_state:boolean = false;
  items:  BleDevice[] = [];

  deviceConnected:boolean = false;
  connected_b: string="leaf-outline";
  color_start: string="success";
  color_finish:string="danger";

  data: number = 0;

  errorData: any = "none";

  constructor() { 
  }

  async ngOnInit() {

    //Se inicializa el modulo.
    await BleClient.initialize();

    //Se manda a actualizar el estado del BT.
    this.updateBluetoothStatus();

    //se observa el estado de la locaclización
    this.locationVerifier();

    //Mandar a enlistar los dispositivos.
    const isEnabled = await BleClient.isEnabled();
    this.listarDispositivos(isEnabled);

    
  }


  //Actualizamos el estado del BT cada vez que haya un cambio.
  async updateBluetoothStatus() {
    const isEnabled = await BleClient.isEnabled();
    if (isEnabled) {
      this.ble_estado = true;
    } else {
      this.ble_estado = false;
    }
    this.updateBluetoothStatus();
  }


  //observamos si la localización esta activada
  async locationVerifier(){

    const locationEnabled= await BleClient.isLocationEnabled();
    if (locationEnabled){
      this.location_state=true;
    }else{
      this.location_state=false;
    }
    this.locationVerifier();
  }

  LocationOn(){
    BleClient.openLocationSettings();

  }

  LocationOff(){

    BleClient.openLocationSettings();
  }

  //Boton para encender BT
  BLEon(){
    BleClient.openBluetoothSettings();
    this.refresh();
  }

  //Boton para apagar BT
  BLEoff(){
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
      await BleClient.connect(device.deviceId, (device) => {this.onDisconnect() });
      
      this.deviceConnected=true;
      this.connected_b="checkmark-circle-outline"
      this.obtenerData();
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

    try{

      await BleClient.startNotifications(
        this.items[0].deviceId,
        ESP_32,
        characteristicUUID,
        (value) => {
          this.data = value.getUint8(0);
        }
      );

    }catch(error){
      this.data=100;
      this.errorData=error;
    }

  }
     
  }


