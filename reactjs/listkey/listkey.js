
// const doubles = numbers.map((number) =><li>{number}</li>);

function NumberList(props) {
  const num = props.number;
  const list = num.map((number) => 
    <li>{number}</li>
  );

  return (
    <ul>{list}</ul>
  );

}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList number = {numbers}/>,
  document.getElementById('item')
);