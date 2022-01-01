CREATE DATABASE IF NOT EXISTS `bbs`;
CREATE TABLE IF NOT EXISTS `bbs`.`node_bbs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `author` varchar(45) NOT NULL,
  `contents` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='bbs for node'
