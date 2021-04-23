# _**Das Projekt (Spitalprojekt)**_

## **1. Idee**

_Ein Spital sammelt viele Daten und Bilder über seine Patienten, aus Vorsorgeuntersuchungen und während der Behandlung. Diese Daten werden in einem Spitalinformationssystem archiviert und verwaltet. Zu Forschungszwecken braucht man nun ein System das einen einfachen und schnellen Zugriff auf die Daten ermöglicht. Der Zugang muss von verschiedenen Orten aus möglich sein, weil Home Office und so.
Im konkreten Fall handelt es sich um Histologie Gewebeproben. Die Daten bestehen aus Bildern der gefärbten Gewebeproben plus einigen Metainformationen.
Es soll also ein System gebaut werden, welches den Zugriff auf eine grosse Menge von solchen Bilddaten erlaubt. Dabei liegt der Fokus im Organisieren und Beschreiben der Bilder, nicht in der Verarbeitung (3D Darstellung, Segmentierung, Befundung). Dazu soll es möglich sein, die Gewebeproben mit Kommentaren oder mit Tags zu versehen.
Der Zugriff auf die Funktionalität soll über einen Web-Client möglich sein. Der Status des Systems soll aus der Ferne via Web Browser überwacht werden können._

## **2. Anforderungen**

Die Idee hat Anklang gefunden und es wurden folgende Anforderungen bei den verschiedenen Anspruchsgruppen gesammelt:

    Bilder bestehen aus einer Beschreibung sowie den eigentlichen Bilddaten. Die Bilder werden in einem PACS System gespeichert und sollen über das WADO-URI Protokoll angesprochen werden.
        Als PACS wurde Orthanc verwendet, welcher unter allServices/docker-compose konfiguriert wird. Über das web ist dieser unter der URL v000561.fhnw.ch/orthanc/ ansprechbar. Der Databaseloader sowie React sprechen den Orthanc an.

    Kommentare können zu einem Bild hinzugefügt oder geändert werden. Sie werden in einer Datenbank gespeichert.
        Es läuft eine PostrgreSQL Datenbank, welche alle Kommentare, Tags etc. speichert. Siehe postgres Service im docker-compose file. 

    Die Bilddaten eines Bildes sollen in voller Grösse angezeigt werden können (Detailsicht).
        In der Bilderansicht erscheint ein icon oben rechts vom Bild, mit welchem das Bild in voller grösse angezeigt werden kann.

    Der Client wird als Browser-basierte Web Applikation implementiert.
        Siehe https://v000561.fhnw.ch

    Das Backend basiert auf Spring Boot, REST Services
        Der Code zum Backend befindet sich im Ordner sip-api/

    Bilder können durch Tags gekennzeichnet werden.
        Backend: Controller / Model / Repository / Service von 'Hashtag'
        Frontend: Zur anzeige wird der Component 'Tag' verwendet

    Für den Build soll maven und als Containertechnologie Docker verwendet werden.
        Siehe allServices/docker-compose
        Maven: Siehe pom-files in sip-api, sip-databaseloader, sip-react, sip-admin

    Alle Server-Dienste laufen in unabhängigen Containern (Micro-Services Architektur)
        Siehe allServices/docker-compose

    Der Zugriff auf die Applikation ist vom Internet aus möglich.
        https://v000561.fhnw.ch

    Dem System können beliebige neue Tags hinzugefügt oder bestehende gelöscht werden.
        Tags können für einzelne Bilder sowie alle selektierten Bilder hinzugefügt und gelöscht werden

    Man kann alle Bilder, die einen oder mehrere Tags aufweisen, zusammen anzeigen lassen (AND und OR).
        Die suche ist aktuell nur auf 'AND' verknüpfungen ausgelegt. Könnte in einem nächsten Schritt jedoch erweitert werden.
        Die Suche wird von der sip-api ausgeführt, siehe imageservice file

    Man möchte einen Überblick über alle Bilder haben.
        Zur besseren Übersicht kann die Thumbnail-grösse verstellt werden.
        Thumbnails werden von Databaseloader erstellt und dem Frontend zuverfügung gestellt.

    Man hat einen Überblick über die Verwendung der Tags.
        Unter 'Statistics' ist eine ausführliche anzeige der verwendeten Tags.
        Siehe 'Statistics'-Komponente im sip-react

    Das Server Betriebssystem soll GNU/Linux (Debian) sein. Die Auswahl des PACS-Servers soll in Absprache mit dem CIO erfolgen.
        Nach absprache wurde das Orthanc Image als PACS verwendet.

    Es muss ein Qualitätsmanagement implementiert werden.
        Es werden Tests automatisiert ausgeführt, welche bei den Pipelines im Gitlab heruntergeladen werden können. Die Tests bieten noch potential zur erweiterung bezüglich beispielsweise der tetabdeckung.
        Mit hilfe von POM files in den jeweiligen Ordnern.

    Das Hochfahren der Infrastruktur muss automatisiert erfolgen.
        Eine Pipeline wurde im Gitlab implementiert, welche automatisiert die aktuellste version der master-branches auf den server lädt und startet.
        siehe gitlab-ci und docker-compose

    Authentifizierung: Der Zugriff soll nur authentifizierten Benutzern erlaubt sein. Zur Authentifizierung soll OIDC (OpenID Connect) mit dem Identity Provider keycloak verwendet werden.
        Keycloak wurde verwendet. Das docker-compose File importiert automatisch den benötigten Realm. Der User muss manuell hinzugefügt werden, wenn die Postgres Datenbank gelöscht wurde.

    Es soll gitlab.fhnw.ch eingesetzt werden und bei jedem Push soll der Build und die Tests automatisch ausgeführt werden (Continuous Integration mit Gitlab Runner)
        Wurde mit der Pipeline umgesetzt. Siehe gitlab-ci.yml file

