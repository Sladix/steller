const { Component } = React;

class StoryList extends Component{
  
  render(){
    return(
      <div className="story-list">
        {this.props.stories.map(function(story){
              return <Story key={story.id} data={story} />;
        })}
        {this.props.stories.length < 1 && <span>No stories</span> }
      </div>
    )
  }
}

window.StoryList = StoryList