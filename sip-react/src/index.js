import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

// const eventLogger = (event, error) => {
//   console.log('onKeycloakEvent', event, error)
// }

// const tokenLogger = (tokens) => {
//   console.log('onKeycloakTokens', tokens)
// }


// ReactDOM.render(
//   <React.StrictMode>
//     <ReactKeycloakProvider keycloak={keycloak} authClient={keycloak} onEvent={eventLogger} onTokens={tokenLogger}>
//       <App />
//     </ReactKeycloakProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


//Initialization of the keycloak instance
keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  console.log(keycloak);
  console.log(authenticated);
  // console.log(getState().keycloakLogin);
  if (!authenticated) {
      window.location.reload();
  } else {
      console.info("Authenticated");
  }

  //React Render on authentication
  ReactDOM.render(<App />, document.getElementById('root'));

  //store authentication tokens in sessionStorage
  sessionStorage.setItem('authentication', keycloak.token);
  sessionStorage.setItem('refreshToken', keycloak.refreshToken);

  //to regenerate token on expiry
  /*setTimeout(() => {
      keycloak.updateToken(298).then((refreshed) => {
          if (refreshed) {
              console.debug('Token refreshed' + refreshed);
          } else {
              console.warn('Token not refreshed, valid for '
                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
      }).catch(() => {
          console.error('Failed to refresh token');
      });


  }, 1000)*/
    const refresh = async () => {
        keycloak.updateToken(121).then((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(() => {
            console.error('Failed to refresh token');
        });
        setTimeout(refresh, 60 * 1000);
    }
    refresh()

}).catch(() => {
  console.error("Authenticated Failed");
});

reportWebVitals();
