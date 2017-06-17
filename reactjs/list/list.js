class ToList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

class ToDo extends React.Component {
  
  constructor(props) {
    super(props);
    this.updateList = this.updateList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {item: [], text: ''};
  }
  
  updateList(e) {
    this.setState({text: e.target.value});
    console.log(e.target.value);
  }
  
  handleSubmit(e) {
    e.preventDefault(); 
    var newItem = {
      text: this.state.text
    }
    console.log(typeof (this.state.item));
    this.setState((prevState) => ({
      item: prevState.item.concat(newItem),
      text: ''
    }));
  }
  
  render() {
    return (
      <div>
        <h3>List</h3>
        <ToList items={this.state.item}/>
        <form onSubmit = {this.handleSubmit}>
          <input type="text" onChange={this.updateList} value={this.state.text}/>
          <button >ADD</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <ToDo />,
  document.getElementById('item')
);