
class ChildOne extends React.Component {
  
  render() {
    return (
      <div>
        <h1>Child one</h1>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

class ChildTwo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
      <div className="form-container">
        <h1>Child TWo</h1>
        <p>{this.props.name}</p>
      </div>
    );
  }
}
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'niraj'
    }
  }
  
  render() {
    return (
      <div>
      <p>{this.props.name}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <div><Main name={'niraj'}/><ChildOne /></div>,
  document.getElementById('props')
);

