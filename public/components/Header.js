const { Component } = React

class Header extends Component{
  render(){
    return(
      <header>
        <span className="action-bar">
          <a href="#" onClick={this.props.handleContinue} className="btn btn-success">Continue a story</a>
          <a href="#" onClick={this.props.handleCreate} className="btn btn-primary">Create a story</a>
        </span>
        <p><img src={this.props.user.photoURL} height="32px" width="32px"/> {this.props.user.displayName}</p>
        <a href="#" onClick={this.props.logout}>Logout</a>
      </header>
    )
  }
}

window.Header = Header