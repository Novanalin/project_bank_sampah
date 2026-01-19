-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 16, 2026 at 04:42 PM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank_sampah_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminID`, `nama`, `username`, `password`) VALUES
(1, 'Admin 1', 'admin1', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detailTransaksi`
--

CREATE TABLE `detailTransaksi` (
  `detailID` int NOT NULL,
  `transaksiID` int NOT NULL,
  `jenisSampahID` int NOT NULL,
  `namaJenis` varchar(255) NOT NULL,
  `berat` decimal(10,2) NOT NULL,
  `hargaPerKg` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenisSampah`
--

CREATE TABLE `jenisSampah` (
  `jenisSampahID` int NOT NULL,
  `namaJenis` varchar(255) NOT NULL,
  `hargaPerKg` decimal(10,2) NOT NULL,
  `stok` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporanStok`
--

CREATE TABLE `laporanStok` (
  `stokID` int NOT NULL,
  `jenisSampahID` int NOT NULL,
  `periode` varchar(255) NOT NULL,
  `stokAwal` decimal(10,2) NOT NULL,
  `stokMasuk` decimal(10,2) NOT NULL,
  `stokKeluar` decimal(10,2) NOT NULL,
  `stokAkhir` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporanTransaksi`
--

CREATE TABLE `laporanTransaksi` (
  `laporanID` int NOT NULL,
  `transaksiID` int NOT NULL,
  `periode` varchar(255) NOT NULL,
  `totalHarga` decimal(10,2) NOT NULL,
  `totalBerat` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengepul`
--

CREATE TABLE `pengepul` (
  `pengepulID` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `telepon` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `transaksiID` int NOT NULL,
  `adminID` int NOT NULL,
  `customerID` int DEFAULT NULL,
  `pengepulID` int DEFAULT NULL,
  `tanggal` date NOT NULL,
  `tipeTransaksi` varchar(255) NOT NULL,
  `totalBerat` decimal(10,2) NOT NULL,
  `totalHarga` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `detailTransaksi`
--
ALTER TABLE `detailTransaksi`
  ADD PRIMARY KEY (`detailID`),
  ADD KEY `fk_detail_transaksi` (`transaksiID`),
  ADD KEY `fk_detail_jenisSampah` (`jenisSampahID`);

--
-- Indexes for table `jenisSampah`
--
ALTER TABLE `jenisSampah`
  ADD PRIMARY KEY (`jenisSampahID`);

--
-- Indexes for table `laporanStok`
--
ALTER TABLE `laporanStok`
  ADD PRIMARY KEY (`stokID`),
  ADD KEY `fk_laporanStok_jenisSampah` (`jenisSampahID`);

--
-- Indexes for table `laporanTransaksi`
--
ALTER TABLE `laporanTransaksi`
  ADD PRIMARY KEY (`laporanID`),
  ADD KEY `fk_laporanTransaksi_transaksi` (`transaksiID`);

--
-- Indexes for table `pengepul`
--
ALTER TABLE `pengepul`
  ADD PRIMARY KEY (`pengepulID`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`transaksiID`),
  ADD KEY `fk_transaksi_admin` (`adminID`),
  ADD KEY `fk_transaksi_customer` (`customerID`),
  ADD KEY `fk_transaksi_pengepul` (`pengepulID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detailTransaksi`
--
ALTER TABLE `detailTransaksi`
  MODIFY `detailID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

--
-- AUTO_INCREMENT for table `jenisSampah`
--
ALTER TABLE `jenisSampah`
  MODIFY `jenisSampahID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laporanStok`
--
ALTER TABLE `laporanStok`
  MODIFY `stokID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `laporanTransaksi`
--
ALTER TABLE `laporanTransaksi`
  MODIFY `laporanID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengepul`
--
ALTER TABLE `pengepul`
  MODIFY `pengepulID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `transaksiID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailTransaksi`
--
ALTER TABLE `detailTransaksi`
  ADD CONSTRAINT `fk_detail_jenisSampah` FOREIGN KEY (`jenisSampahID`) REFERENCES `jenisSampah` (`jenisSampahID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_detail_transaksi` FOREIGN KEY (`transaksiID`) REFERENCES `transaksi` (`transaksiID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `laporanStok`
--
ALTER TABLE `laporanStok`
  ADD CONSTRAINT `fk_laporanStok_jenisSampah` FOREIGN KEY (`jenisSampahID`) REFERENCES `jenisSampah` (`jenisSampahID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `laporanTransaksi`
--
ALTER TABLE `laporanTransaksi`
  ADD CONSTRAINT `fk_laporanTransaksi_transaksi` FOREIGN KEY (`transaksiID`) REFERENCES `transaksi` (`transaksiID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_transaksi_admin` FOREIGN KEY (`adminID`) REFERENCES `admin` (`adminID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_transaksi_customer` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_transaksi_pengepul` FOREIGN KEY (`pengepulID`) REFERENCES `pengepul` (`pengepulID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
