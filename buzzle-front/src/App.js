import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import parameters from './parameters.js'

import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import HomePage from './pages/HomePage.js';

class App extends React.Component {
    state = {
        'user': null,
        'messages': [],
        'error': null
    };

    handleError = error => {
        this.setState({ error });
    }

    handleUserLoad = () => {
        fetch(`${parameters.apiURL}/user`, {
            'method': 'GET',
            'headers': { 'Accept': 'application/json' }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({ 'user': data.user });
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    handleUserCreate = credentials => {
        fetch(`${parameters.apiURL}/register`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(credentials)
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({ 'user': data.user });
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    handleUserLogin = credentials => {
        fetch(`${parameters.apiURL}/login`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(credentials)
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({ 'user': data.user });
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    handleMessageLoad = () => {
        fetch(`${parameters.apiURL}/messages`, {
            'method': 'GET',
            'headers': { 'Accept': 'application/json' }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({ 'messages': data.messages });
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    handleMessageCreate = (content, onSuccess) => {
        fetch(`${parameters.apiURL}/message/create`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({ content })
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({
                      'messages': [...this.state.messages, data]
                  });
                  onSuccess();
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    handleMessageEdit = (id, content, onSuccess) => {
        fetch(`${parameters.apiURL}/message/${id}/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({
                      'messages': this.state.messages.map(item => (
                          item.message.id === data.message.id ? data : item
                      ))
                  });
                  onSuccess();
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    handleMessageDelete = id => {
        fetch(`${parameters.apiURL}/message/${id}/delete`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json'
            }
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  this.handleError(data.error);
              } else {
                  this.setState({
                      'messages': this.state.messages.filter(item => item.message.id !== id)
                  });
              }
          })
          .catch(error => {
              this.handleError(`${error}`);
          });
    }

    componentDidMount() {
        this.handleUserLoad();
        this.handleMessageLoad();
    }

    render() {
        const error = this.state.error;
        if (error) {
            this.state.error = null;
        }

        const user = this.state.user;
        const messages = this.state.messages;

        return (
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginPage
                            error={error}
                            user={user}
                            handleError={this.handleError}
                            handleUserLogin={this.handleUserLogin} />
                    </Route>
                    <Route path="/register">
                        <RegisterPage
                            error={error}
                            user={user}
                            handleError={this.handleError}
                            handleUserCreate={this.handleUserCreate} />
                    </Route>
                    <Route path="/">
                        <HomePage
                            error={error}
                            user={user}
                            messages={messages}
                            handleError={this.handleError}
                            handleMessageCreate={this.handleMessageCreate}
                            handleMessageEdit={this.handleMessageEdit}
                            handleMessageDelete={this.handleMessageDelete} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
