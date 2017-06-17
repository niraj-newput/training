// ReactDOM.render(
//   <div>
//   <h1>Hello react</h1>
//   <p>This is my first app in react js .</p>
//   </div>,
//   document.getElementById('demo')
// );

const user = {
  name: 'niraj',
  age: 23
};

function userDetails(user){
  return user.name + ', age : ' + user.age;
}

var element = (
  <h1> hello {userDetails(user)}</h1>
);


ReactDOM.render(
  element,
  document.getElementById('demo')
);