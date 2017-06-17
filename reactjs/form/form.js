
class UserList extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{
        this.props.user.map((value) =>(
          <tr key={value.key}>
            <td>{value.name} </td>
            <td>{value.contact}</td>
            <td><button className="btn btn-primary" onClick={this.props.deleteUser} value={value.key}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.setName = this.setName.bind(this);
    this.setContact = this.setContact.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      user: [],
      name: '',
      contact:''
    };
  }
  
  deleteUser(event) {
    var index = null;
    event.persist();
    this.setState(function(prevState) {
      var user = prevState.user;
      var length = prevState.user.length;
      for(var i = 0; i < length; i++) {
        if(user[i].key == event.target.value) {
          index = user.indexOf(user[i]);
        }
      }
      this.state.user = prevState.user.splice(index,1);
    }
    );
  }
  
  setName(event) {
    this.setState({
      name: event.target.value
    });
  }
  
  setContact(event) {
    this.setState({
      contact: event.target.value
    });
  }
  
  submit(event){
    event.preventDefault();
    var newUser = { name: this.state.name, contact: this.state.contact, key: new Date().getTime()}; 
    this.setState(function(prevState) {
      this.state.user = prevState.user.push(newUser);
      this.state.name = '';
      this.state.contact = '';
    });
  }
  
  render() {
    return (
      <div className="row form-container">
        <div className="col-xs-6">
          <div className="row ">
            <div className="col-xs-offset-3 col-xs-6 ">
              <form className="form-horizontal" onSubmit={this.submit}>
                <div className="form-group">
                  <label className="label-control">Name:</label>
                  <input className="form-control" type="text" onChange={this.setName} value={this.state.name}/>
                </div>
                <div className="form-group">
                  <label className="label-control">Contact:</label>
                  <input className="form-control"  type="text" onChange={this.setContact} value={this.state.contact}/>
                </div>
                <div className="form-group">
                  <input type="submit" value="Add User" className="btn btn-primary"/>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xs-6">
          <h2 className="text-center">User List</h2>
          <UserList user={this.state.user} deleteUser={this.deleteUser.bind(this)}/>
        </div>
      </div>
    );
  }
}

class MainComponent extends React.Component {
  render() {
    return (
      <Form />
    );
  }
}

ReactDOM.render(
  <MainComponent />,
  document.getElementById('form')
);