# _**Das Projekt (Spitalprojekt)**_

## **1. Idee**

_Ein Spital sammelt viele Daten und Bilder über seine Patienten, aus Vorsorgeuntersuchungen und während der Behandlung. Diese Daten werden in einem Spitalinformationssystem archiviert und verwaltet. Zu Forschungszwecken braucht man nun ein System das einen einfachen und schnellen Zugriff auf die Daten ermöglicht. Der Zugang muss von verschiedenen Orten aus möglich sein, weil Home Office und so.
Im konkreten Fall handelt es sich um Histologie Gewebeproben. Die Daten bestehen aus Bildern der gefärbten Gewebeproben plus einigen Metainformationen.
Es soll also ein System gebaut werden, welches den Zugriff auf eine grosse Menge von solchen Bilddaten erlaubt. Dabei liegt der Fokus im Organisieren und Beschreiben der Bilder, nicht in der Verarbeitung (3D Darstellung, Segmentierung, Befundung). Dazu soll es möglich sein, die Gewebeproben mit Kommentaren oder mit Tags zu versehen.
Der Zugriff auf die Funktionalität soll über einen Web-Client möglich sein. Der Status des Systems soll aus der Ferne via Web Browser überwacht werden können._

## **2. Anforderungen**

Die Idee hat Anklang gefunden und es wurden folgende Anforderungen bei den verschiedenen Anspruchsgruppen gesammelt:

    Bilder bestehen aus einer Beschreibung sowie den eigentlichen Bilddaten. Die Bilder werden in einem PACS System gespeichert und sollen über das WADO-URI Protokoll angesprochen werden.

    Kommentare können zu einem Bild hinzugefügt oder geändert werden. Sie werden in einer Datenbank gespeichert.

    Die Bilddaten eines Bildes sollen in voller Grösse angezeigt werden können (Detailsicht).

    Der Client wird als Browser-basierte Web Applikation implementiert.

    Das Backend basiert auf Spring Boot, REST Services

    Bilder können durch Tags gekennzeichnet werden.

    Für den Build soll maven und als Containertechnologie Docker verwendet werden.

    Alle Server-Dienste laufen in unabhängigen Containern (Micro-Services Architektur)

    Der Zugriff auf die Applikation ist vom Internet aus möglich.

    Dem System können beliebige neue Tags hinzugefügt oder bestehende gelöscht werden.

    Man kann alle Bilder, die einen oder mehrere Tags aufweisen, zusammen anzeigen lassen (AND und OR).

    Man möchte einen Überblick über alle Bilder haben.

    Man hat einen Überblick über die Verwendung der Tags.

    Das Server Betriebssystem soll GNU/Linux (Debian) sein. Die Auswahl des PACS-Servers soll in Absprache mit dem CIO erfolgen.

    Es muss ein Qualitätsmanagement implementiert werden.

    Das Hochfahren der Infrastruktur muss automatisiert erfolgen.

    Authentifizierung: Der Zugriff soll nur authentifizierten Benutzern erlaubt sein. Zur Authentifizierung soll OIDC (OpenID Connect) mit dem Identity Provider keycloak verwendet werden.

    Es soll gitlab.fhnw.ch eingesetzt werden und bei jedem Push soll der Build und die Tests automatisch ausgeführt werden (Continuous Integration mit Gitlab Runner)

