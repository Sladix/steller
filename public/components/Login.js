const { Component } = React

class Login extends Component{
  constructor(){
    super()
  }
  
  showProviders(){
    document.querySelector('div.providers').classList.remove('hidden');
  }
  
  render(){
    return(
      <div>
        <div className="actions">
          <a onClick={this.showProviders} className="btn btn-primary show-providers">Login to create and continue stories</a> <a className="btn btn-success smooth-scroll" href="#">Read stories</a>
        </div>
        <div className="providers hidden">
          <a className="provider google" data-provider="google" onClick={this.props.handleProvider}>Sign in with Google</a>
        </div>
      </div>
    )
  }
}

window.Login = Login