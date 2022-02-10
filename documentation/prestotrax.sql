-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 09, 2022 at 11:16 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prestotrax`
--
CREATE DATABASE IF NOT EXISTS `prestotrax` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `prestotrax`;

-- --------------------------------------------------------

--
-- Table structure for table `device_info`
--

CREATE TABLE `device_info` (
  `ID` int(11) NOT NULL,
  `OWNER_ID` int(11) NOT NULL,
  `DEVICE_LATITUDE` varchar(50) NOT NULL,
  `DEVICE_LONGITUDE` varchar(50) NOT NULL,
  `PINGED_AT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MOVING` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `device_info`
--

INSERT INTO `device_info` (`ID`, `OWNER_ID`, `DEVICE_LATITUDE`, `DEVICE_LONGITUDE`, `PINGED_AT`, `MOVING`) VALUES
(1, 8, '33.512766 / N 33° 30\' 45.956\"', '-112.126330 / W 112° 7\' 34.786\"', '2022-02-09 16:13:49', 0),
(2, 8, '33.512766 / N 33° 30\' 45.956\"', '-112.126330 / W 112° 7\' 34.786\"', '2022-02-09 16:13:58', 0),
(3, 8, '33.512766 / N 33° 30\' 45.956\"', '-112.126330 / W 112° 7\' 34.786\"', '2022-02-09 16:13:59', 0),
(4, 8, '33.512766 / N 33° 30\' 45.956\"', '-112.126330 / W 112° 7\' 34.786\"', '2022-02-09 16:13:59', 0);

-- --------------------------------------------------------

--
-- Table structure for table `device_records`
--

CREATE TABLE `device_records` (
  `ID` int(11) NOT NULL,
  `OWNER_ID` int(11) NOT NULL,
  `PARENT_DEVICE` int(11) NOT NULL,
  `DEVICE_NAME` varchar(64) NOT NULL DEFAULT 'Jimothy',
  `REPORTED_LOST` tinyint(1) NOT NULL DEFAULT '0',
  `DEVICE_LATITUDE` varchar(50) NOT NULL,
  `DEVICE_LONGITUDE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `device_records`
--

INSERT INTO `device_records` (`ID`, `OWNER_ID`, `PARENT_DEVICE`, `DEVICE_NAME`, `REPORTED_LOST`, `DEVICE_LATITUDE`, `DEVICE_LONGITUDE`) VALUES
(1, 8, 1, 'Jimothy', 0, '33.512766 / N 33° 30\' 45.956\"', '-112.126330 / W 112° 7\' 34.786\"');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(64) NOT NULL,
  `EMAIL` varchar(64) NOT NULL,
  `PASSWORD` varchar(64) NOT NULL,
  `ACCOUNT_CREATED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LAST_LOGIN` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SUSPENDED` tinyint(1) NOT NULL DEFAULT '1',
  `DEVICES_OWNED` int(11) NOT NULL DEFAULT '0',
  `OWNED_DEVICE_IDS` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `ACCOUNT_CREATED`, `LAST_LOGIN`, `SUSPENDED`, `DEVICES_OWNED`, `OWNED_DEVICE_IDS`) VALUES
(1, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:26', '2022-02-09 16:06:26', 1, 0, NULL),
(2, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:29', '2022-02-09 16:06:29', 1, 0, NULL),
(3, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:29', '2022-02-09 16:06:29', 1, 0, NULL),
(4, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:30', '2022-02-09 16:06:30', 1, 0, NULL),
(5, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:30', '2022-02-09 16:06:30', 1, 0, NULL),
(6, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:33', '2022-02-09 16:06:33', 1, 0, NULL),
(7, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:33', '2022-02-09 16:06:33', 1, 0, NULL),
(8, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:34', '2022-02-09 16:06:34', 1, 0, NULL),
(9, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:36', '2022-02-09 16:06:36', 1, 0, NULL),
(10, 'macks', 'test@test.test', 'test', '2022-02-09 16:06:37', '2022-02-09 16:06:37', 1, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device_info`
--
ALTER TABLE `device_info`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `OWNER_ID` (`OWNER_ID`);

--
-- Indexes for table `device_records`
--
ALTER TABLE `device_records`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `OWNER_ID` (`OWNER_ID`),
  ADD KEY `PARENT_DEVICE` (`PARENT_DEVICE`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device_info`
--
ALTER TABLE `device_info`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `device_records`
--
ALTER TABLE `device_records`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `device_info`
--
ALTER TABLE `device_info`
  ADD CONSTRAINT `owned_by` FOREIGN KEY (`OWNER_ID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `device_records`
--
ALTER TABLE `device_records`
  ADD CONSTRAINT `owned_by2` FOREIGN KEY (`OWNER_ID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `parent_device` FOREIGN KEY (`PARENT_DEVICE`) REFERENCES `device_info` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
