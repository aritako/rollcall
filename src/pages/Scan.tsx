import { IonButton, IonButtons, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { PluginListenerHandle } from '@capacitor/core';
import { BarcodeFormat, BarcodeScanner, LensFacing, StartScanOptions } from '@capacitor-mlkit/barcode-scanning';
import React, { useEffect, useState } from 'react';
import { error } from 'console';
import { returnUpBackOutline } from 'ionicons/icons';
import './scan.css';

const checkPermission = async () => {
    const status = await BarcodeScanner.checkPermissions();
    if (status.camera === 'denied') {
        const requestResult = await BarcodeScanner.requestPermissions()
        if (requestResult.camera === 'granted' || requestResult.camera === 'limited') { // limited keyword is for iOS
            return true;
        }
    }
    else return true;
    return false;
}

const checkGoogleBarcodeScannerModule = async () => {
    const status = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
    if (status.available === false) {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
        const listener = await BarcodeScanner.addListener('googleBarcodeScannerModuleInstallProgress', (event) => {
            console.log('Install progress:', event.progress, event.state);
            if (event.state === 4) { // for Completed
                console.log('Install progress: COMPLETED');
                listener.remove();
            }
            else if (event.state === 3 || event.state === 5) {
                console.log("Install progress: CANCELED or FAILED");
                listener.remove();
            }
        })
        return;
    }
    console.log("Google Barcode Scanner Module is already installed.");
}

const Tab2 = () => {
    const [result, setResult] = useState('');
    
    useEffect(() => {
        const listener = BarcodeScanner.addListener('barcodeScanned', (event) => {
            setResult(event.barcode.displayValue);
            stopScan();
        });
        return () => { listener.remove(); };
    }, []);

    const stopScan = async () => {
        await BarcodeScanner.stopScan();
        document.querySelectorAll('.hide-on-scanner-active')?.forEach(
            (elem) => elem.classList.remove('qr-scanner-active'))
    }

    const startScan = async () => {
        const support = await BarcodeScanner.isSupported();
        const perms = await checkPermission();
        //await checkGoogleBarcodeScannerModule();
        //if (!support || !perms) return;

        try {
            const options : StartScanOptions = {
                formats: [BarcodeFormat.QrCode], 
                lensFacing: LensFacing.Back
            }
            await BarcodeScanner.startScan(options);
            document.querySelectorAll('.hide-on-scanner-active')?.forEach(
                (elem) => elem.classList.add('qr-scanner-active')) 
        } 
        catch (e) {
            console.error('Closing camera due to error:', e);
            stopScan();
        }
 };

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
        <IonContent className="ion-padding hide-on-scanner-active">
            Last scanned: {result}
        </IonContent>
        <IonGrid className="bottom">
            <IonButton onClick={startScan}>
                Start QR Code
            </IonButton>
            <IonButton onClick={stopScan}>
                Stop QR Code
            </IonButton>
        </IonGrid>
    </IonPage>
);
};

export default Tab2;