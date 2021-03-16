-- user_id evtl löschen bei search_favorites


-- ************************************** `comments`

CREATE TABLE `comments`
(
 `id`        int NOT NULL AUTO_INCREMENT ,
 `comment`   text NOT NULL ,
 `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
);


-- ************************************** `tags`

CREATE TABLE `tags`
(
 `id`        int NOT NULL AUTO_INCREMENT ,
 `name`      varchar(255) NOT NULL ,
 `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
);


-- ************************************** `search_favorites`

CREATE TABLE `search_favorites`
(
 `id`        int NOT NULL AUTO_INCREMENT ,
 `user_id`   int NOT NULL ,
 `name`      varchar(255) NULL ,
 `comments`  text NULL ,
 `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
);


-- ************************************** `search_tags`

CREATE TABLE `search_tags`
(
 `id`                  int NOT NULL AUTO_INCREMENT ,
 `search_favorites_id` int NOT NULL ,
 `tag_id`              int NOT NULL ,
 `timestamp`           datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `fkIdx_65` (`search_favorites_id`),
CONSTRAINT `FK_64` FOREIGN KEY `fkIdx_65` (`search_favorites_id`) REFERENCES `search_favorites` (`id`),
KEY `fkIdx_68` (`tag_id`),
CONSTRAINT `FK_67` FOREIGN KEY `fkIdx_68` (`tag_id`) REFERENCES `tags` (`id`)
);


-- ************************************** `images`

CREATE TABLE `images`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `description` text NULL ,
 `thumbnail`   varchar(255) NOT NULL ,
 `pacs_id`     int NOT NULL ,
 `timestamp`   datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
);


-- ************************************** `tag_assignments`

CREATE TABLE `tag_assignments`
(
 `id`        integer NOT NULL AUTO_INCREMENT ,
 `image_id`  int NOT NULL ,
 `tag_id`    int NOT NULL ,
 `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `fkIdx_28` (`image_id`),
CONSTRAINT `FK_27` FOREIGN KEY `fkIdx_28` (`image_id`) REFERENCES `images` (`id`),
KEY `fkIdx_35` (`tag_id`),
CONSTRAINT `FK_34` FOREIGN KEY `fkIdx_35` (`tag_id`) REFERENCES `tags` (`id`)
);


-- ************************************** `comment_assigments`

CREATE TABLE `comment_assigments`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `comment_id` int NOT NULL ,
 `image_id`   int NOT NULL ,
 `timestamp`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `fkIdx_50` (`comment_id`),
CONSTRAINT `FK_49` FOREIGN KEY `fkIdx_50` (`comment_id`) REFERENCES `comments` (`id`),
KEY `fkIdx_53` (`image_id`),
CONSTRAINT `FK_52` FOREIGN KEY `fkIdx_53` (`image_id`) REFERENCES `images` (`id`)
);


