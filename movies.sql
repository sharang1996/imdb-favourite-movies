-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2021 at 07:20 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` varchar(100) NOT NULL,
  `title` varchar(250) NOT NULL,
  `plot` varchar(1000) DEFAULT NULL,
  `poster` varchar(250) DEFAULT NULL,
  `released` varchar(250) DEFAULT NULL,
  `rating` varchar(100) DEFAULT NULL,
  `runtime` varchar(250) DEFAULT NULL,
  `genre` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `plot`, `poster`, `released`, `rating`, `runtime`, `genre`) VALUES
('tt0103776', 'Batman Returns', 'While Batman deals with a deformed man calling himself the Penguin wreaking havoc across Gotham with the help of a cruel businessman, a female employee of the latter becomes the Catwoman with her own vendetta.', 'https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg', '19 Jun 1992', '7.0', '126 min', 'Action, Crime, Fantasy'),
('tt0120575', 'Power Rangers in Space', 'The most evil forces of the universe (Rita & Zedd, the Machine Empire and Divatox) have formed an alliance with the monarch of all evil, Dark Specter. With Zordon as his prisoner, Dark ...', 'https://m.media-amazon.com/images/M/MV5BMTM1NTUwNTcwMV5BMl5BanBnXkFtZTcwNTcyNzYxMQ@@._V1_SX300.jpg', '06 Feb 1998', '7.2', '30 min', 'Action, Adventure, Family, Sci-Fi'),
('tt0287871', 'Power Rangers Wild Force', 'Five teenagers are chosen by five Power Animals to become the Wild Force Rangers, to fight the evil Jinderax and Toxica and their evil Orgs.', 'https://m.media-amazon.com/images/M/MV5BZmI1NWU4OTAtNGYxNi00NjUxLTgwNzktZTNiNTNjMWYzYmFlXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_SX300.jpg', '09 Feb 2002', '6.3', '30 min', 'Action, Adventure, Drama, Family, Fantasy, Sci-Fi'),
('tt0389860', 'Click', 'A workaholic architect finds a universal remote that allows him to fast-forward and rewind to different parts of his life. Complications arise when the remote starts to overrule his choices.', 'https://m.media-amazon.com/images/M/MV5BMTA1MTUxNDY4NzReQTJeQWpwZ15BbWU2MDE3ODAxNw@@._V1_SX300.jpg', '23 Jun 2006', '6.4', '107 min', 'Comedy, Drama, Fantasy, Romance'),
('tt0417741', 'Harry Potter and the Half-Blood Prince', 'As Harry Potter begins his sixth year at Hogwarts, he discovers an old book marked as \"the property of the Half-Blood Prince\" and begins to learn more about Lord Voldemort\'s dark past.', 'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg', '15 Jul 2009', '7.6', '153 min', 'Action, Adventure, Family, Fantasy, Mystery'),
('tt0848228', 'The Avengers', 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', '04 May 2012', '8.0', '143 min', 'Action, Adventure, Sci-Fi'),
('tt10515848', 'Bureau of Transformer', 'Hao Yun, a vet at a private clinic, leads a mundane life until he accidentally discovers the world is inhabited by monsters. Worried about the secret of their existence leaking, monsters ...', 'https://m.media-amazon.com/images/M/MV5BZjQ0NjdjYTUtNzk1Zi00ZTVhLWIxNzItMTU2OTk1NDViM2Q1XkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_SX300.jpg', '05 Jun 2019', '7.7', 'N/A', 'Drama'),
('tt2313197', 'Batman: The Dark Knight Returns, Part 1', 'Batman has not been seen for ten years. A new breed of criminal ravages Gotham City, forcing 55-year-old Bruce Wayne back into the cape and cowl. But, does he still have what it takes to fight crime in a new era?', 'https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg', '25 Sep 2012', '8.0', '76 min', 'Animation, Action, Crime, Drama, Thriller'),
('tt2395427', 'Avengers: Age of Ultron', 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth\'s mightiest heroes to stop the villainous Ultron from enacting his terrible plan.', 'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg', '01 May 2015', '7.3', '141 min', 'Action, Adventure, Sci-Fi'),
('tt2975590', 'Batman v Superman: Dawn of Justice', 'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.', 'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', '25 Mar 2016', '6.4', '152 min', 'Action, Adventure, Sci-Fi'),
('tt4116284', 'The Lego Batman Movie', 'A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.', 'https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg', '10 Feb 2017', '7.3', '104 min', 'Animation, Action, Comedy, Family'),
('tt4154756', 'Avengers: Infinity War', 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.', 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg', '27 Apr 2018', '8.4', '149 min', 'Action, Adventure, Sci-Fi'),
('tt4154796', 'Avengers: Endgame', 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg', '26 Apr 2019', '8.4', '181 min', 'Action, Adventure, Drama, Sci-Fi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
