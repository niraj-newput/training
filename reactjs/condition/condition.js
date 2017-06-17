function WarningBanner(props) {
  if(!props.warn) {
    return false;
  }
  return (
    <div>
      <p>Warning</p>
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.actionClick = this.actionClick.bind(this);
  }
  
  actionClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning}></WarningBanner>
        <button onClick={this.actionClick}>
          {this.state.showWarning ? 'hide': 'show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('cond')
);