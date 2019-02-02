import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";

const Container = styled.div`
  color: black;

  font-size: 2rem;
  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

class Rows extends Component {
  render() {
    // const { WeekdayFilter, TypeFilter, VenueFilter } = this.props;
    let { rows, filterType, filterWeekDay } = this.props;

    console.log("weekday filter:", filterWeekDay);

    const Filtered = rows
      .filter(item => {
        return item.type.toLowerCase().search(filterType.toLowerCase()) !== -1;
      })
      .filter(item => {
        return (
          item.weekday.toLowerCase().search(filterWeekDay.toLowerCase()) !== -1
        );
      })
      .map(item => (
        <tr>
          <td>{item.weekday}</td>
          <td>{item.starttime}</td>
          <td>{item.endtime}</td>
          <td>{item.type}</td>
          <td>{item.location}</td>
          <td>{item.grade}</td>
          <td>{item.agerequirements}</td>
          <td>{item.otherrequirements}</td>
        </tr>
      ));
    return (
      <center>
        <Container>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Day of Week</th>
                <th>Start</th>
                <th>End</th>
                <th>Dance</th>
                <th>Location</th>
                <th>Grade</th>
                <th>Age</th>
                <th>Other Requirements</th>
              </tr>
            </thead>
            <tbody>{Filtered}</tbody>
          </Table>
        </Container>
      </center>
    );
  }
}
export default Rows;
