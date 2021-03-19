export const config = {
    "API_BASE_URL": process.env.API_BASE_URL ?
    process.env.API_BASE_URL : "http://localhost:8081",
    "KEYCLOAK_BASE_URL": process.env.KEYCLOAK_BASE_URL ?
    process.env.KEYCLOAK_BASE_URL : "http://localhost:8080"
    }