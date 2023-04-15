
CREATE TABLE `article` (
  `id` int NOT NULL,
  `desc` varchar(100) NOT NULL,
  `article_url` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `title` varchar(100) NOT NULL,
  `categorie` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `categorie` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;
