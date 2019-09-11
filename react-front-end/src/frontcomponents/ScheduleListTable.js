import React from "react";
import "./ScheduleListTable.css";

export default function ScheduleListTable(props) {
  // const now = new Date();
  // const y = now.getYear() + 1900;
  // const m = now.getMonth() + 1;
  // const d = now.getDate();

  function beautyTime(time) {
    let ampm = "";
    let temp = time.split("T")[1];
    temp.split(":");
    let hour = parseInt(temp.split(":")[0]);
    let min = temp.split(":")[1];
    if (hour < 12) {
      ampm = " a.m.";
    } else {
      ampm = " p.m.";
    }
    return hour + ":" + min + ampm;
  }

  return (
    <React.Fragment>
      {props.newSchedule && (
        <div id="scheduleRoot">
          <table className="box-table">
            <thead id="tableHead">
              {/* <tr>{`Flight Schedule from ${props.newDeparture.name} to ${props.newArrival[0].name} on ${y}/${m}/${d}`}</tr> */}
              <tr>
                <th scope="col">Flight</th>
                <th scope="col">Airline</th>
                <th scope="col">Departure</th>
                <th scope="col">Arrival</th>
              </tr>
            </thead>
            <tbody>
              {props.newSchedule.scheduledFlights.map((schedule, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {schedule.carrierFsCode} {schedule.flightNumber}
                    </td>
                    <td>
                      <img
                        id="airlinelogo"
                        alt="airlinelogo"
                        style={{ opacity: 1, maxHeight: 30, maxWidth: 50 }}
                        src={`http://pics.avs.io/500/250/${schedule.carrierFsCode}.png`}
                      ></img>
                    </td>
                    <td>{beautyTime(schedule.departureTime)}</td>
                    <td>{beautyTime(schedule.arrivalTime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}
