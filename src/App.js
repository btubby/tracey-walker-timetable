import React, { Component } from "react";
// import logo from "./logo.svg";
import TWLogo from "./Assets/twlogo.png";
import Loader from "./components/Loader";
import Rows from "./components/Rows";
import "./App.css";
import styled from "styled-components";
import { Button, ButtonGroup, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PageContainer = styled.div`
  // width: 90%;
  // align: center;
`;
const RowsContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  display: inherit;
`;
const Search = styled.div`
  display: flex;
  flex-direction:column
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filterStringType: "",
      filterStringWeekday: ""
    };
    this.filterDanceType = this.filterDanceType.bind(this);
    this.filterDanceWeekDay = this.filterDanceWeekDay.bind(this);
    this.filtersClear = this.filtersClear.bind(this);
  }

  getGoogleSheetData(sheet_id) {
    let a = [];

    //https://spreadsheets.google.com/feeds/worksheets/1lbpvyatnJ45_W_2YH9RFO035hMqISRUqcVqJCabOQPs/public/basic?alt=json
    let url =
      "https://spreadsheets.google.com/feeds/list/" +
      sheet_id +
      "/od6/public/values?alt=json";
    console.log("Talking to google sheets [" + url + "]");
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        // var now = new Date();
        responseJson.feed.entry.forEach(function(event, index) {
          if (index >= 0) {
            console.log("row", event);
            let parsed_event = formatEvent(event);
            a.push(parsed_event);
          }
        });
        this.setState({ data: a, loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.setState({ loading: true });
    let sheet_id = "1lbpvyatnJ45_W_2YH9RFO035hMqISRUqcVqJCabOQPs"; // TracyWalker
    // let sheet_id = "1kE0fM_01RpTDuOYWKASbvK5vwhlTJ35DrsEVeFOKueQ"; // TTS
    this.getGoogleSheetData(sheet_id);
  }
  filterDanceType(e) {
    this.setState({
      filterStringType: e.target.value.toLowerCase()
    });
  }
  filterDanceWeekDay(e) {
    this.setState({
      filterStringWeekday: e.target.value.toLowerCase()
    });
  }
  filtersClear(e) {
    this.setState({
      filterStringWeekday: "",
      filterStringType: ""
    });
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <PageContainer>
        <Jumbotron>
          <h1>Tracey Walker Timetable 💃 🕺</h1>
          <img src={TWLogo} className="App-logo" alt="logo" />
        </Jumbotron>

        <Search>
          {/* <ButtonToolbar> */}
          <div>
            <ButtonGroup>
              <Button
                bsStyle="primary"
                value="ballet"
                onClick={this.filterDanceType}
              >
                Ballet
              </Button>
              <Button
                bsStyle="primary"
                value="street"
                onClick={this.filterDanceType}
              >
                Street
              </Button>
              <Button
                bsStyle="primary"
                value="Musical Theatre"
                onClick={this.filterDanceType}
              >
                Musical Theatre
              </Button>
              <Button
                bsStyle="primary"
                value="Tap"
                onClick={this.filterDanceType}
              >
                Tap/Modern
              </Button>
              <Button
                bsStyle="primary"
                value="Contemporary"
                onClick={this.filterDanceType}
              >
                Contemporary
              </Button>
              <Button
                bsStyle="primary"
                value="Elite"
                onClick={this.filterDanceType}
              >
                Elite
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <ButtonGroup>
              <Button
                bsStyle="info"
                value="Monday"
                onClick={this.filterDanceWeekDay}
              >
                Monday
              </Button>
              <Button
                bsStyle="info"
                value="Tuesday"
                onClick={this.filterDanceWeekDay}
              >
                Tuesday
              </Button>
              <Button
                bsStyle="info"
                value="Wednesday"
                onClick={this.filterDanceWeekDay}
              >
                Wednesday
              </Button>
              <Button
                bsStyle="info"
                value="Thursday"
                onClick={this.filterDanceWeekDay}
              >
                Thursday
              </Button>
              <Button
                bsStyle="info"
                value="Friday"
                onClick={this.filterDanceWeekDay}
              >
                Friday
              </Button>
              <Button
                bsStyle="info"
                value="Saturday"
                onClick={this.filterDanceWeekDay}
              >
                Saturday
              </Button>
            </ButtonGroup>
          </div>

          <Button
            bsSize="large"
            bsStyle="success"
            value=""
            onClick={this.filtersClear}
          >
            CLEAR ALL FILTERS
          </Button>

          {/* </ButtonToolbar> */}
        </Search>
        <RowsContainer>
          <Rows
            rows={this.state.data}
            filterType={this.state.filterStringType}
            filterWeekDay={this.state.filterStringWeekday}
            // WeekdayFilter="Saturday"
            // VenueFilter="Little Hallingbury Village Hall"
          />
        </RowsContainer>
      </PageContainer>
    );
  }
}
function formatEvent(event) {
  console.log("formatEvent BEFORE:", event);
  const formattedEvent = {
    grade: typeof event.gsx$grade !== "undefined" ? event.gsx$grade.$t : "",
    type: typeof event.gsx$type !== "undefined" ? event.gsx$type.$t : "",
    starttime:
      typeof event.gsx$starttime !== "undefined" ? event.gsx$starttime.$t : "",
    endtime:
      typeof event.gsx$endtime !== "undefined" ? event.gsx$endtime.$t : "",
    weekday:
      typeof event.gsx$weekday !== "undefined" ? event.gsx$weekday.$t : "",
    location:
      typeof event.gsx$location !== "undefined" ? event.gsx$location.$t : "",
    agerequirements:
      typeof event.gsx$agerequirements !== "undefined"
        ? event.gsx$agerequirements.$t
        : "",
    otherrequirements:
      typeof event.gsx$otherrequirements !== "undefined"
        ? event.gsx$otherrequirements.$t
        : ""
  };

  console.log("formatEvent AFTER:", formattedEvent);
  return formattedEvent;
}
export default App;
