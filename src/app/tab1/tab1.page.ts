import { Component, OnInit} from '@angular/core';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
import { BluetoothLe } from '@capacitor-community/bluetooth-le';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  mensajeEstado = "Encender";
  estado: boolean = false;
  alerta: string = "";

  bleStatus: string = 'No inicializado';

  constructor() {
    this.checkBluetoothStatus();
  }

  ngOnInit(): void {
    this.checkBluetoothStatus();
    //Chequear si el BT ya esta activado o no
    if(this.estado){
      this.mensajeEstado = "Apagar";
      this.alerta = "¿Desea desactivar el BT?"
    }
    else{
      this.mensajeEstado = "Encender";
      this.alerta = "¿Desea activar el BT?";
    }
  }

  async checkBluetoothStatus() {
    const status = await BluetoothLe.isEnabled();
    this.estado = status.value;
    if(this.estado){
      this.mensajeEstado = "Apagar";
      this.alerta = "¿Desea desactivar el BT?"
    }
    else{
      this.mensajeEstado = "Encender";
      this.alerta = "¿Desea activar el BT?";
    }
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        if(this.mensajeEstado == "Encender"){
          this.mensajeEstado = "Apagar";
          this.alerta = "¿Desea desactivar el BT?";
        }
        else{
          this.mensajeEstado = "Encender";
          this.alerta = "¿Desea activar el BT?"
        }
        NativeSettings.openAndroid({
          option: AndroidSettings.Bluetooth
        });
        this.checkBluetoothStatus();
      },
    },
  ];

  setResult() {
    return 0
  }

}
