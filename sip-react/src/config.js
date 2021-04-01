export const config = {
    "API_BASE_URL": process.env.API_BASE_URL ?
        process.env.API_BASE_URL : "http://localhost",
    "KEYCLOAK_BASE_URL": process.env.KEYCLOAK_BASE_URL ?
        process.env.KEYCLOAK_BASE_URL : "http://localhost",

}