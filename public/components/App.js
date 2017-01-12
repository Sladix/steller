const { Component } = React

const request = superagent

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA8bRfDK9qeDDYUcsl9wl4AJgVgOqa0wtQ",
  authDomain: "exquisitecorpses-f01e0.firebaseapp.com",
  databaseURL: "https://exquisitecorpses-f01e0.firebaseio.com",
  storageBucket: "exquisitecorpses-f01e0.appspot.com",
  messagingSenderId: "27645804644"
};
firebase.initializeApp(config);

var stories = [
  {
    id:"KeiLk5fsN-mDf2",
    title:"Random choosen title or maybe 1 word/phrase",
    phrases:[
      {author:"Sladix",text:"Le petit bonhomme qui courait dans"},
      {author:"Bob",text:"l'herbe, raclait souvent les fonds de"},
      {author:"Bob",text:"bidet, c'était pas très propre mais"},
      {author:"Cruella",text:"on s'en sortait toujours bien !"},
      {author:"Sansfin",text:"Jusqu'à ce qu'il tombe dedans..."}
    ]
  }
];

class App extends Component{
  constructor(){
    super();
    this.state = {
      connected:true,
      stories : stories,//[],
      user:false,
      formVisible:false,
      formData:{},
    };
    this.provider = null;
    this.providers = {
      'google' : new firebase.auth.GoogleAuthProvider()
    };
  }
  
  _handleLogout(evt){
    firebase.auth().signOut().then(function() {
      self.setState({
        user:null,
        connected:false
      });
    }, function(error) {
      // An error happened.
    });
  }
  
  _handleLogin(evt){
    let p = evt.target.dataset.provider;
    this.provider = this.providers[p];
    let self = this;
    firebase.auth().signInWithPopup(this.provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      self.setState({
        user:user,
        connected:true
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage);
      self.setState({
        user:false,
        connected:false
      });
    });
  }
  
  _handleContinue(){
    this.setState({
      formData : this.state.stories[0],
      formVisible : true
    })
  }
  
  _handleCreate(){
    alert('create');
  }
  
  componentWillMount(){
    let self = this;
    // Ecouteur de connexion
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          connected:true,
          user:user
        });
      }else{
        self.setState({
          user:false,
          connected:false
        });
      }
    });
    
    //On recup ce qu'on a en base
  }
  
  render(){
    return(
      <div>
        { this.state.connected && <Header handleCreate={this._handleCreate.bind(this)} handleContinue={this._handleContinue.bind(this)} logout={this._handleLogout.bind(this)} user={this.state.user} /> }
        <h2>Welcome</h2>
        <div className="presentation">
          <p>Steller is an online Exquise Corpses multiplayer game. Each player writes a sentence of 9 words or 35 characters. After submitting words, you can see the beginning of the story. In the end, when 5 sentences are completed, the story is over and a new one can be started.</p>
        </div>
        { !this.state.connected && <Login handleProvider={this._handleLogin.bind(this)} /> }
        { this.state.connected && <StoryForm  data={this.state.formData} visible={this.state.formVisible} /> }
        <StoryList stories={this.state.stories}  />
      </div>
    )
  }
}

window.App = App