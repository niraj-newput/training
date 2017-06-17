var Greeting = React.createClass({
 render: function() {
   return (
     React.createElement('h1', null, 'Hello, world!')
   );
 }
});
window.addEventListener('load', function() {
 ReactDOM.render(
  React.createElement(Greeting, null),
  document.body
 );
});

//const element = <h1>hello react</h1>;
ReactDOM.render(
 <Greeting />,
 document.getElementById('root')
);

