// src/components/QRCodeGen.jsx
import React, { useState } from 'react';
import { useEffect } from "react";
import QRCode from 'qrcode';
import supabase from '../config/supabaseClient';
import { IonItem, IonList, IonSelect, IonSelectOption, IonButton, IonButtons } from '@ionic/react';

var classes_arr = new Array();
var class2 = new Array();
const QRCodeGen: React.FC = () => {
  const [classes, setName] = useState<any[]>([]);

  useEffect(() => {
    getClasses();
  }, []);

  async function getClasses() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('teaching_view')
      .select()
      .eq('professor_id', user?.user_metadata?.student_number);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      // Handle the case where data might be null
      setName(data || []);
    }
  }

  const [selectedItem, setSelectedItem] = useState('');
  const [attendanceId, setAttendanceId] = useState('');
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

  const generateQRCode = async () => {

    try {
      // Replace 'localhost:3000' with your actual localhost address and port
      const url = `http://localhost:8100/app/dashboard/attendance/${selectedItem}`;
      const dataURL = await QRCode.toDataURL(url);
      setQrCodeDataURL(dataURL);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelection = (e: CustomEvent) => {
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
      {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGen;
