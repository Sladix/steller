const { Component } = React;

class StoryForm extends Component{
  constructor(){
    super();
    this.charLimit = 50;
    this.state = {
      inputValue:'',
      charLeft:this.charLimit
    }
  }
  
  _updateInput(e){
    if(e.target.value.length <= this.charLimit){
      this.setState({
        inputValue : e.target.value,
        charLeft : this.charLimit - e.target.value.length
      })
    }
  }
  
  render(){
    const className = this.props.visible ? "story-form" : "story-form hidden";
    let phrase = false;
    let length = 0;
    let hiddens = [];
    // Handle form data
    
    if(this.props.data.title){
      // Existing one  
      
      length = this.props.data.phrases.length;
      phrase = this.props.data.phrases[length-1];
      for(let i = 1 ; i < length ; i++){
        hiddens.push(<div className="hidden-phrase"></div>);
      }     
    }else{
      // New one
    }
    
    return(
      <div className={className}>
        <form className="form">
          {phrase && <div>
            {hiddens}
            <div className="phrase">
                <span className="story-author">{phrase.author}</span>
                {phrase.text}
            </div>
          </div>}
          <div className="input-group">
            <input type="text" value={this.state.inputValue} onChange={this._updateInput.bind(this)} className="form-control" id="exampleInputAmount" placeholder="Enter your sentence here" />
            <div className="input-group-addon">{this.state.charLeft}</div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
  
}

window.StoryForm = StoryForm;