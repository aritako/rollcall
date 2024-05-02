import { IonButton, IonButtons, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillLeave, useIonRouter } from '@ionic/react';
import { PluginListenerHandle } from '@capacitor/core';
import { BarcodeFormat, BarcodeScanner, LensFacing, StartScanOptions } from '@capacitor-mlkit/barcode-scanning';
import React, { useEffect, useState } from 'react';
import { error } from 'console';
import { returnUpBackOutline } from 'ionicons/icons';
import './scan.css';
import QRCodeGen from '../components/QRCodeGen';
import { User, UserMetadata } from '@supabase/supabase-js';
import { Router } from 'react-router';
    
const checkPermissions = async () : Promise<boolean> => {
    await BarcodeScanner.requestPermissions();
    return true;
    const status = await BarcodeScanner.checkPermissions();
    if (status.camera == "denied") {
        const requestResult = await BarcodeScanner.requestPermissions()
        if (requestResult.camera == 'granted' || requestResult.camera == 'limited') { // limited keyword is for iOS
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
            console.log('[GoogleScannerModule] Install progress:', event.progress, event.state);
            if (event.state === 4) { // for Completed
                console.log('[GoogleScannerModule] Install progress: COMPLETED');
                listener.remove();
            }
            else if (event.state === 3 || event.state === 5) {
                console.log("[GoogleScannerModule] Install progress: CANCELED or FAILED");
                listener.remove();
            }
        })
        return;
    }
    console.log("[GoogleScannerModule] Google Barcode Scanner Module is already installed.");
}

interface ViewProps {
    user: User | null;
}

const Tab2: React.FC<ViewProps> = ({user}) => {
    const [metadata, setMetadata] = useState<UserMetadata | null>(null);
    const router = useIonRouter();
    const [isScanning, isScanningSetter] = useState(false);

    let listener : PluginListenerHandle;
    useEffect(() => {
        listener = BarcodeScanner.addListener('barcodeScanned', (event) => {
            console.log("I LISTENER");
            stopScan();
            router.push(event.barcode.displayValue);
        });
        return () => { listener.remove(); };
    }, []);

    useEffect(() => {
        if (user) setMetadata(user.user_metadata);
    }, [user]);

    const stopScan = async () => {
        await BarcodeScanner.stopScan();
        document.querySelectorAll('.hide-on-scanner-active')?.forEach(
            (elem) => elem.classList.remove('qr-scanner-active'))
        isScanningSetter(false);
    }

    const startScan = async () => {
        const support = await BarcodeScanner.isSupported();
        const perms = await checkPermissions();
        await checkGoogleBarcodeScannerModule(); // Might not be necessary
        if (!support || !perms) {
            console.error('Unable to start camera (either not supported or no permission).');
            return;
        }

        try {
            const options : StartScanOptions = {
                formats: [BarcodeFormat.QrCode], 
                lensFacing: LensFacing.Back
            }
            await BarcodeScanner.startScan(options);
            document.querySelectorAll('.hide-on-scanner-active')?.forEach(
                (elem) => elem.classList.add('qr-scanner-active')) 
            isScanningSetter(true);
        } 
        catch (e) {
            console.error('Closing camera due to', e);
            stopScan();
        }    
    };

    const toggleScan = async () => {
        if (isScanning) stopScan();
        else startScan();
    };
    
    // Cleanup code: makes sure camera closes when page is left
    useIonViewWillLeave(() => { 
        stopScan(); 
    });

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
            {metadata?.user_type === "professor" && <QRCodeGen/>}
        </IonContent>
        {metadata?.user_type === "student" && 
            <IonButton className="ion-padding bottom" onClick={toggleScan} shape='round' size="large">
                Scan QR Code
            </IonButton>
        }
    </IonPage>
);
};

export default Tab2;