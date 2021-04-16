

 <!DOCTYPE html>

<html>
<head>
    <title>SIP Status</title>
    <style>
        body {
            background-color: lightgray;
        }
        #states {
            background-color: white;
            margin: auto;
            width: 300px;
            border: 5px solid gray;
            padding: 20px 40px 30px 40px;
        }
        img {
            width: 1rem;
        }

    </style>
</head>
<body>
    <?php

    // Orthanc
    function checkOrthancUp() {
        $ch = curl_init();
        
        $headr = array();
        $headr[] = 'Accept: application/json';
        $headr[] = 'Authorization: Basic b3J0aGFuYzpnMDREIWMwbSNvclQoaClhbmtz';

        curl_setopt($ch, CURLOPT_HTTPHEADER,$headr);
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/orthanc/system'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode == 200) {
            return true;
        }
        return false;
    }

    // Orthanc Images
    function checkOrthancImages() {
        $ch = curl_init();
        
        $headr = array();
        $headr[] = 'Accept: application/json';
        $headr[] = 'Authorization: Basic b3J0aGFuYzpnMDREIWMwbSNvclQoaClhbmtz';

        curl_setopt($ch, CURLOPT_HTTPHEADER,$headr);
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/orthanc/instances'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($httpCode == 200) {
            if($result && strlen(trim($result)) > 2){
                return true;
            }
        }
        return false;
    }

    // Keycloak
    function checkKeycloakUp() {
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/auth/realms/FHNW-LST-MI'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($httpCode == 200) {
            return true;
        }
        return false;
    }

    // Keycloak Token
    function getKeycloakToken() {
        $ch = curl_init();

        $data = array(
            'client_id' => 'web-app',
            'username' => 'user',
            'password' => '$!pU53r',
            'grant_type' => 'password'
        );

        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "client_id=web-app&username=user&password=$!pU53r&grant_type=password");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/auth/realms/FHNW-LST-MI/protocol/openid-connect/token'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $json = json_decode($result, true);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        return $json;
    }


    // API Images
    function checkApiImages($token) {
        $ch = curl_init();

        $authorization = "Authorization: Bearer ". $token;

        curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization));
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/api/images'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);
        
        if ($httpCode == 200) {
            if($result && strlen(trim($result)) > 2){
                return true;
            }
        }
        return false;
    }

    // API
    function checkApi($token) {
        $ch = curl_init();

        $authorization = "Authorization: Bearer ". $token;

        curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization));
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/api/images'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);
        
        if ($httpCode == 200) {
            return true;
        }
        return false;
    }

    // React
    function checkReact() {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://v000561.fhnw.ch/'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode == 200) {
            return true;
        }
        return false;
    }
    

    function displayState($message, $isUp) {
        return "
            <div class='messages'>
                <img src='".($isUp ? "ok.png" : "fail.png")."'></img>
                ".$message."
            </div>
        ";
    } 
    ?>

<div id="states">

    <?php
    // Orthanc
    if (checkOrthancUp())
        echo displayState("Orthanc is up", true);
    else
        echo displayState("Orthanc is down", false);

    // Orthanc images
    if (checkOrthancImages()) 
        echo displayState("Orthanc has images", true);
    else
        echo displayState("Orthanc does not have images", false);

    // Keycloak
    if (checkKeycloakUp())
        echo displayState("Keycloak realm is running", true);
    else
        echo displayState("Keycloak realm is not running", false);

    // Keycloak Token
    $keycloakToken = getKeycloakToken();
    if ($keycloakToken['access_token'])
        echo displayState("Successfully got keycloak token", true);
    else
        echo displayState("Did not get keycloak token", false);

    // Api
    if (checkApi($keycloakToken['access_token']))
        echo displayState("API is running", true);
    else
        echo displayState("API is not running", false);

    // Api images
    if (checkApiImages($keycloakToken['access_token']))
        echo displayState("Could load images via API", true);
    else
        echo displayState("Could not load images API", false);

    // React
    if (checkReact())
        echo displayState("Website is reachable", true);
    else 
        echo displayState("Website is unreachable", false);
    ?>

</div>
</body>
</html>