/*
package ch.fhnw.lst.sipapi;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.ClientResource;
import org.keycloak.admin.client.resource.ClientsResource;
import org.keycloak.representations.idm.ClientRepresentation;



*/
/**
 * Created by ggastald on 15/06/16.
 *//*



public class KeycloakClientTest {

    @Test
    public void test() {
        String serverUrl = "http://localhost:8080/auth";
        String realm = "FHNW-LST-MI";
        String clientId = "security-admin-console";
        String providerId = "keycloak-oidc-keycloak-json";
        String user = "admin";
        String password = "k3YS4s3cur1ty!";

        // Make sure that Direct Access Grants Enabled is enabled for the given clientId
        Keycloak kc = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .clientId(clientId)
                .username(user)
                .password(password)
                .build();
        ClientsResource clientsResource = kc.realm(realm).clients();
        List<ClientRepresentation> clientRepresentationList = clientsResource.findByClientId(clientId);
        ClientRepresentation clientRepresentation = clientRepresentationList.get(0);
        ClientResource clientResource = clientsResource.get(clientRepresentation.getId());
        System.out.println(clientResource.getInstallationProvider(providerId));
    }

}

*/
