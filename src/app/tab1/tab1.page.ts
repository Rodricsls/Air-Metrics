import { Component, OnInit } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  bluetoothStatus: string="";

  constructor(private alertController: AlertController) { 
    
  }

  async ngOnInit() {
    await BleClient.initialize();
    const isEnabled = await BleClient.isEnabled();
    this.updateBluetoothStatus();

    //verificamos el estado del bluetooth
    if (isEnabled) {
      this.bluetoothStatus = 'Bluetooth activado';
    } else {
      this.bluetoothStatus = 'Bluetooth desactivado. Porfavor activar Bluetooth.';
      //mandamos a llamar a una alerta para que se active el bluetooth desde los settings
      const alert = await this.alertController.create({
        header: 'Activar Bluetooth',
        message: 'La aplicación necesita activar Bluetooth para su funcionamiento. Desea activarlo?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Sí',
            handler: () => {

              //Si el usario acepta, se redirige a los settings
              BleClient.openBluetoothSettings();
            }
          }
        ]
      });
      await alert.present();
    }

    BleClient.startEnabledNotifications((isEnabled) => {
      this.updateBluetoothStatus();
      
    });
  }


  //observamos constantemente el estado de bluetooth para actualizarlo

  async updateBluetoothStatus() {
    const isEnabled = await BleClient.isEnabled();
    if (isEnabled) {
      this.bluetoothStatus = 'Bluetooth activado';
    } else {
      this.bluetoothStatus = 'Bluetooth desactivado. Porfavor activar Bluetooth.';
    }
  }
}
