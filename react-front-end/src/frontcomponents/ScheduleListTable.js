import React from "react";
import "./ScheduleListTable.css";

export default function ScheduleListTable(props) {
  const now = new Date();
  const y = now.getYear() + 1900;
  const m = now.getMonth() + 1;
  const d = now.getDate();

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
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {props.newSchedule.scheduledFlights.map(schedule => {
                return (
                  <tr key="1">
                    <td>
                      {schedule.carrierFsCode} {schedule.flightNumber}
                    </td>
                    <td>AirlinesURL</td>
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
