import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { PluginListenerHandle } from '@capacitor/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import React from 'react';


const Tab2: React.FC = () => {
    
    // note currently working properly yet, will go back to this at a later sprint
    async function installGoogleBarcodeScanner() : Promise<void> {
        await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then((x) => {
            if (x.available === false) {
                BarcodeScanner.installGoogleBarcodeScannerModule().then(() => {
                    const listnr = BarcodeScanner.addListener('googleBarcodeScannerModuleInstallProgress', (event) => {
                        console.log("LISTEN: " + event.progress + " " + event.state); 
                        if (event.state !== 4) 
                            installGoogleBarcodeScanner();
                    });
                });
            }  
            else console.log("AVAILABLE");
        })
    }

    async function scan() : Promise<void> {
        console.log("SCANNING");       
        installGoogleBarcodeScanner();

        const granted = await BarcodeScanner.requestPermissions();
        if (!granted) {
          console.log("PERMISSION NOT GRANTED");
          return;
        }
        const scanResult = await BarcodeScanner.scan();
        console.log("SCAN RESULT " + scanResult);
    }

    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot = "start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Scan QR Code</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                Insert Scan QR UI Here...
            </IonContent>
            <IonButton onClick={scan}>
                Use Scanner
            </IonButton>
        </IonPage>
    );
};

export default Tab2;