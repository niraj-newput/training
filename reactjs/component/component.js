// function List(props) {
//   return (
//     <ul>
//     <li> {props.name}</li>
//     </ul>
//   );
// }

class List extends React.Component {
  
  constructor() {
    super();
    console.log(this);
    console.log('this.props');
    console.log(this.props);
  }
  componentWillMount() {
    console.log('component will mount');
  }
  componentDidMount() {
    console.log('component did mount');
  }
  componentWillReceiveProps() {
    console.log('props');
    console.log(this.props);
    console.log('component receive props'  + this.props.myNumber);
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('props');
    console.log(this.props);
    console.log('Component WILL UPDATE!');
  }

  componentDidUpdate(prevProps, prevState) {
     console.log('Component DID UPDATE!')
  }

  componentWillUnmount() {
     console.log('Component WILL UNMOUNT!')
  }
  
  render() {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
}



class App extends React.Component {

  constructor(props) {
    super(props);
		this.state = {
      data: 0
    }
    this.setNewNumber = this.setNewNumber.bind(this)
  };
  
  setNewNumber() {
    this.setState({data: this.state.data + 1})
  }

  render() {
    return (
      <div>
        <button onClick = {this.setNewNumber}>INCREMENT</button>
        <List myNumber = {this.state.data}></List>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('componentapp'),
  function callback(){
    console.log('callback');
  }
);
// setTimeout(() => {
//    ReactDOM.unmountComponentAtNode(document.getElementById('componentapp'));}, 10000);
