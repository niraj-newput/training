
function LogInButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogOutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }
  
  logInClick() {
    this.setState({isLoggedIn: true});
  }
  
  logOutClick() {
    this.setState({isLoggedIn: false});
  }
  
  render() {
    let button = "";
    if(this.isLoggedIn) {
      button = <LogInButton onClick={this.logInClick}/>;
    }else {
      button = <LogOutButton onClick={this.logOutClick}/>;
    }
    
    return (
      <div>
        <p> user</p>{button}
      </div>
    );
  }
}

React.render(
  <LogIn />,
  document.getElementById('main')
);
