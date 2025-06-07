import FlightCard from "./FlightCard";

const FlightsList = ({ filteredFlights, handleBook }) => {
  return (
    <div className="space-y-5">
      {filteredFlights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} handleBook={handleBook} />
      ))}
    </div>
  );
};

export default FlightsList;
