export const config = {
    "API_BASE_URL": process.env.API_BASE_URL ?
        process.env.API_BASE_URL : "http://192.168.0.30",
    "KEYCLOAK_BASE_URL": process.env.KEYCLOAK_BASE_URL ?
        process.env.KEYCLOAK_BASE_URL : "http://192.168.0.30",

}