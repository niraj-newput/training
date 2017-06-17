function Comment(props) {
  return (
    <div className="userdetails">
      <Profile user= {props.user}/>
      <div>
        <h3>hello {props.user.name}</h3>
      </div>
      <div>
        <p>Date : {props.user.date}</p>
      </div>
    </div>
  );
}

function Profile(props){
  return (
    <div className="user-image">
      <img src={props.user.imageUrl} alt={props.user.name}/>
    </div>
  );
}
var user = {
  name: 'micky',
  imageUrl: 'https://bootstrap-themes.github.io/application/assets/img/avatar-dhg.png',
  date: new Date().getDate().toString()
};

ReactDOM.render(
  <Comment user={user} />,
  document.getElementById('cmt'),
  function callback(){
    console.log('success');
  }
);