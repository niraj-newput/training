// function Clock(props) {
//   return (
//     <div>
//       <h1>Clock</h1>
//       <h2> it is { props.date.toLocaleTimeString() }.</h2>
//     </div>
//   );
// }
// function tick() {
//   ReactDOM.render(
//     <Clock />,
//     document.getElementById('clockapp')
//   );
// }

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() }; 
  }
  
  tick() {
    this.setState( {
      date: new Date()
    });
  }
  
  componentDidMount() {
    console.log('moute methods');
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  componentWillUnmount(){
    console.log('will unmout');
    clearInterval(this.timerID);
  }
  
  render() {
    return (
      <div  className="container">
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <h1>Clock</h1>
            <h2> it is { this.state.date.toLocaleTimeString() }.</h2>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('clockapp')
);

