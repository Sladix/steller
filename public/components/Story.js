const { Component } = React

class Story extends Component{
  constructor(){
    super();
    this.limitPhrases = 10;
    this.state = {
      
    };
  }
  
  render(){
    return(
      <div className="story">
        <div className="story-title">{this.props.data.title}</div>
        <div className="story-content">
        {this.props.data.phrases.map(function(phrase,index){
              return <div key={index} className="phrase">
                <span className="story-author">{phrase.author}</span>
                {phrase.text}
              </div>;
        })}
        </div>
        <div className="story-participants"></div>
      </div>
    )
  }
}

window.Story = Story