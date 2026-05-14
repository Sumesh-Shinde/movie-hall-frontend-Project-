import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import './style.scss';

const BookingSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('bookingId');

  const [bookingData, setBookingData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (bookingId) {
      fetch(`http://localhost:8080/api/bookings/${bookingId}`)
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data);

          // Generate QR Code with booking details
          const qrData = `Movie: ${data.showtime.movie.title}\nDate: ${data.showtime.showtime}\nSeats: ${data.selectedSeats}\nTotal: ₹${data.totalPrice}`;
          QRCode.toDataURL(qrData, (err, url) => {
            if (!err) setQrCodeUrl(url);
          });
        })
        .catch((error) => console.error('Error fetching booking details:', error));
    }
  }, [bookingId]);

  const handleDownloadTicket = () => {
    if (!bookingData) return;

    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Movie Ticket', 80, 20);

    doc.setFontSize(12);
    doc.text(`Movie: ${bookingData.showtime.movie.title}`, 20, 40);
    doc.text(`Theater: ${bookingData.showtime.theaterName}`, 20, 50);
    doc.text(`Date: ${new Date(bookingData.showtime.showtime).toLocaleString()}`, 20, 60);
    doc.text(`Seats: ${bookingData.selectedSeats}`, 20, 70);
    doc.text(`Total Price: ₹${bookingData.totalPrice}`, 20, 80);

    // ✅ Add QR Code to PDF
    if (qrCodeUrl) {
      doc.addImage(qrCodeUrl, 'PNG', 60, 90, 80, 80);
    }

    doc.save(`Movie_Ticket_${bookingId}.pdf`);
  };

  if (!bookingData) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div className="summary">
      <h1 className="summary__heading">Booking Summary</h1>

      <div className="summary__details">
        <div className="summary__detail">
          <span className="summary__label">Movie:</span>
          <span className="summary__value">{bookingData.showtime.movie.title}</span>
        </div>
        <div className="summary__detail">
          <span className="summary__label">Theater:</span>
          <span className="summary__value">{bookingData.showtime.theaterName}</span>
        </div>
        <div className="summary__detail">
          <span className="summary__label">Date:</span>
          <span className="summary__value">{new Date(bookingData.showtime.showtime).toLocaleString()}</span>
        </div>
        <div className="summary__detail">
          <span className="summary__label">Seats:</span>
          <span className="summary__value">{bookingData.selectedSeats}</span>
        </div>
        <div className="summary__detail">
          <span className="summary__label">Total Price:</span>
          <span className="summary__value">₹{bookingData.totalPrice}</span>
        </div>
      </div>

      {/* ✅ Show QR Code Preview */}
      {qrCodeUrl && (
        <div className="summary__qr">
          <img src={qrCodeUrl} alt="QR Code" />
          <p>Scan this QR code for booking details</p>
        </div>
      )}

      <button className="summary__button" onClick={handleDownloadTicket}>
        Download Ticket
      </button>
    </div>
  );
};

export default BookingSummary;
