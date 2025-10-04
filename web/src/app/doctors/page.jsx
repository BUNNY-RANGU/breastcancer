"use client";
import { useState, useEffect } from "react";

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Oncologist",
      experience: "15+ years",
      image: "👩‍⚕️",
      description: "Specializing in breast cancer treatment and research",
      available: ["Monday", "Tuesday", "Wednesday", "Friday"],
      rating: 4.9,
    },
    {
      id: 2,
      name: "Dr. Emily Rodriguez",
      specialty: "Medical Data Scientist",
      experience: "12+ years",
      image: "👩‍🔬",
      description: "Expert in predictive modeling and risk assessment",
      available: ["Tuesday", "Thursday", "Friday"],
      rating: 4.8,
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      specialty: "Radiologist",
      experience: "18+ years",
      image: "👨‍⚕️",
      description: "Specialist in breast imaging and diagnostic techniques",
      available: ["Monday", "Wednesday", "Thursday"],
      rating: 4.9,
    },
    {
      id: 4,
      name: "Dr. Robert Kim",
      specialty: "Research Director",
      experience: "20+ years",
      image: "👨‍🎓",
      description: "Leading clinical trials and treatment innovations",
      available: ["Monday", "Tuesday", "Friday"],
      rating: 4.7,
    },
    {
      id: 5,
      name: "Dr. Maria Garcia",
      specialty: "Surgical Oncologist",
      experience: "14+ years",
      image: "👩‍⚕️",
      description: "Expert in breast cancer surgical procedures",
      available: ["Tuesday", "Wednesday", "Thursday"],
      rating: 4.8,
    },
    {
      id: 6,
      name: "Dr. David Chen",
      specialty: "Medical Oncologist",
      experience: "16+ years",
      image: "👨‍⚕️",
      description: "Specialist in chemotherapy and targeted therapy",
      available: ["Monday", "Wednesday", "Friday"],
      rating: 4.9,
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    // Check for payment status in URL
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("payment");
    const sessionId = urlParams.get("session_id");

    if (paymentStatus === "success" && sessionId) {
      setBookingStatus("payment_success");
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const fetchBookedSlots = async () => {
    try {
      const response = await fetch("/api/bookings/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          date: selectedDate,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setBookedSlots(data.bookedSlots || []);
      }
    } catch (error) {
      console.error("Failed to fetch booked slots:", error);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.name,
          date: selectedDate,
          time: selectedTime,
          ...bookingForm,
        }),
      });

      if (response.ok) {
        const appointmentData = await response.json();
        // Proceed to payment
        await proceedToPayment(appointmentData.appointment);
      } else {
        setBookingStatus("error");
        setLoading(false);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingStatus("error");
      setLoading(false);
    }
  };

  const proceedToPayment = async (appointmentData) => {
    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appointmentData.id,
          doctorName: appointmentData.doctorName,
          appointmentDate: appointmentData.date,
          appointmentTime: appointmentData.time,
          redirectURL: `${window.location.origin}/doctors?payment=success`,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.open(url, "_blank", "popup");
        setShowBookingForm(false);
        setBookingStatus("payment_processing");
        setBookingForm({ name: "", email: "", phone: "", reason: "" });
      } else {
        setBookingStatus("payment_error");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setBookingStatus("payment_error");
    } finally {
      setLoading(false);
    }
  };

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (selectedDoctor && selectedDoctor.available.includes(dayName)) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  const isSlotBooked = (time) => {
    return bookedSlots.includes(time);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce7f3" }}>
      {/* Header */}
      <div
        className="relative bg-cover bg-center py-16 px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 207, 232, 0.8), rgba(251, 207, 232, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><path d="M0,100 Q300,50 600,100 T1200,100 L1200,300 Q900,250 600,300 T0,300 Z" fill="%23ec4899" opacity="0.3"/><path d="M0,150 Q300,100 600,150 T1200,150 L1200,350 Q900,300 600,350 T0,350 Z" fill="%23ec4899" opacity="0.2"/></svg>')`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-pink-800 mb-4">
            Our Medical Team
          </h1>
          <p className="text-lg text-pink-700">
            Book an appointment with our expert breast cancer specialists
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <a
              href="/"
              className="text-pink-600 hover:text-pink-800 font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-pink-600 hover:text-pink-800 font-medium"
            >
              About
            </a>
            <a
              href="/prediction"
              className="text-pink-600 hover:text-pink-800 font-medium"
            >
              Prediction
            </a>
            <a
              href="/image-analysis"
              className="text-pink-600 hover:text-pink-800 font-medium"
            >
              Image Analysis
            </a>
            <a
              href="/doctors"
              className="text-pink-600 hover:text-pink-800 font-medium border-b-2 border-pink-600"
            >
              Doctors
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {bookingStatus === "payment_success" && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Payment Successful!</strong> Your appointment has been
                  booked and paid for. You will receive a confirmation email
                  with appointment details shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {bookingStatus === "payment_processing" && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Processing Payment...</strong> Please complete your
                  payment in the popup window. Your appointment will be
                  confirmed once payment is successful.
                </p>
              </div>
            </div>
          </div>
        )}

        {bookingStatus === "payment_error" && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>Payment Failed!</strong> There was an issue processing
                  your payment. Please try booking again or contact support.
                </p>
              </div>
            </div>
          </div>
        )}

        {bookingStatus === "success" && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Success!</strong> Your appointment has been booked
                  successfully. You will receive a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {bookingStatus === "error" && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>Error!</strong> There was a problem booking your
                  appointment. Please try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{doctor.image}</div>
                <h3 className="text-xl font-bold text-pink-800 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-pink-600 font-medium">{doctor.specialty}</p>
                <p className="text-gray-500 text-sm">{doctor.experience}</p>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-gray-600">{doctor.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{doctor.description}</p>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Available Days:
                </p>
                <div className="flex flex-wrap gap-1">
                  {doctor.available.map((day) => (
                    <span
                      key={day}
                      className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleBookAppointment(doctor)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-800">
                  Book Appointment
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-pink-700">
                  {selectedDoctor.name}
                </h3>
                <p className="text-gray-600">{selectedDoctor.specialty}</p>
              </div>

              <form onSubmit={handleFormSubmit}>
                {/* Personal Information */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Date *
                  </label>
                  <select
                    required
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  >
                    <option value="">Choose a date</option>
                    {getNextAvailableDates().map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Select Time *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          disabled={isSlotBooked(time)}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm rounded border ${
                            selectedTime === time
                              ? "bg-pink-600 text-white border-pink-600"
                              : isSlotBooked(time)
                                ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-700 border-gray-300 hover:border-pink-500"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    value={bookingForm.reason}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, reason: e.target.value })
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    placeholder="Brief description of your concern..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || loading}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Processing...
                      </>
                    ) : (
                      "Book & Pay $150"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-pink-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-2">Breast Cancer Awareness & Prediction Platform</p>
          <p className="text-pink-200 text-sm">
            This tool is for educational purposes only. Always consult with
            healthcare professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
