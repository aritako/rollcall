// src/components/QRCodeGen.jsx
import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGen: React.FC = () => {
 const [attendanceId, setAttendanceId] = useState('');
 const [qrCodeDataURL, setQrCodeDataURL] = useState('');

 const generateQRCode = async () => {
    try {
      // Replace 'localhost:3000' with your actual localhost address and port
      const url = `http://localhost:8100/app/dashboard/attendance/${attendanceId}`;
      const dataURL = await QRCode.toDataURL(url);
      setQrCodeDataURL(dataURL);
    } catch (err) {
      console.error(err);
    }
 };

 return (
    <div>
      <input
        type="text"
        placeholder="Enter Attendance ID"
        value={attendanceId}
        onChange={(e) => setAttendanceId(e.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
    </div>
 );
};

export default QRCodeGen;
