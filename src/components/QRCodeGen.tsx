// src/components/QRCodeGen.jsx
import React, { useState } from 'react';
import { useEffect } from "react";
import QRCode from 'qrcode';
import supabase from '../config/supabaseClient';
import { IonItem, IonList, IonSelect, IonSelectOption, IonButton, IonButtons, useIonViewWillLeave} from '@ionic/react';

const QRCodeGen: React.FC = () => {
  const [classes, setName] = useState<any[]>([]);

  useEffect(() => {
    getClasses();
  }, []);

  async function getClasses() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('sample_class')
      .select()
      .eq('professor_number', user?.user_metadata?.student_number);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setName(data || []);
    }
  }

  const [selectedItem, setSelectedItem] = useState('');
  //const [attendanceId, setAttendanceId] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  // const fetchClasses = async () => {
  //   const { data: { user } } = await supabase.auth.getUser()

  //   const { data, error } = await supabase
  //     .from('teaching_view')
  //     .select('course_name')
  //     .eq('professor_id', user?.user_metadata?.student_number);

  //   return data

  //   // const classes = data
  //   // console.log(classes)
  //   //  if (classes != null) {
  //   //    for (let i = 0; i < classes.length; i++) {
  //   //      console.log(classes[i].course_name);
  //   //      classes_arr.push(classes[i].course_name)
  //   //    }
  //   //  }
  //   //const arr = Object.keys(idk);

  //   console.log(classes_arr);

  // }

  // Cleanup upon exiting page
  useIonViewWillLeave(() => { 
    setQrCodeDataURL(""); 
    setSelectedItem("");
  });

  const viewQRCode = async () => {

    try {
      const { data, error } = await supabase
      .from("qr_codes")
      .select("qr_id") 
      .eq("class_id", selectedItem)

      if (error)
        console.log(error)
      else if (data[0]) {
        const url = `/app/dashboard/attendance/${data[0].qr_id}`;
        const dataURL = await QRCode.toDataURL(url);
        setQrCodeDataURL(dataURL);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const generateQRCode = async () => {

    try {
      setQrCodeDataURL("");
      await supabase
      .from("qr_codes")
      .delete()
      .eq("class_id", selectedItem);

      await supabase
      .from("qr_codes")
      .insert ( {class_id: selectedItem} ) 
   
      viewQRCode();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelection = (e: CustomEvent) => {
    setQrCodeDataURL("");
    setSelectedItem(e.detail.value);
    console.log(`ionChange fired with value: ${e.detail.value}`)
  };

  return (
    <div>
      <IonSelect
        aria-label="Class"
        placeholder="Select class"
        value={selectedItem} onIonChange={(e) => handleSelection(e)}>
        {classes.map((c) => (
          <IonSelectOption key={c.id} value={c.id}>
            {c.course_name}
          </IonSelectOption>
        ))}
      </IonSelect>
      <IonButton expand="block" onClick={generateQRCode}>
      Generate QR Code
      </IonButton>
      <IonButton expand="block" onClick={viewQRCode}>
      View QR Code
      </IonButton>
      {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGen;
