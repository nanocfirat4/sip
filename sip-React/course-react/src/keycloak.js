import Keycloak from 'keycloak-js'
import { config } from './config'
const keycloak = new Keycloak({
url: `${config.KEYCLOAK_BASE_URL}/auth`,
realm: 'FHNW-LST-MI',
clientId: "web-app"
})
export default keycloak