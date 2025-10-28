-- CreateTable
CREATE TABLE "GolfCourse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "partnershipTier" TEXT NOT NULL,
    "shippingVolume" INTEGER NOT NULL DEFAULT 0,
    "latitude" REAL,
    "longitude" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "serviceLevel" TEXT NOT NULL,
    "baseRate" REAL NOT NULL,
    "onTimeRate" REAL NOT NULL,
    "damageRate" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shipmentNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "originAddress" TEXT NOT NULL,
    "originCity" TEXT NOT NULL,
    "originState" TEXT NOT NULL,
    "originZip" TEXT NOT NULL,
    "destinationCourseId" TEXT,
    "destinationAddress" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "destinationState" TEXT NOT NULL,
    "destinationZip" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,
    "serviceLevel" TEXT NOT NULL,
    "trackingNumber" TEXT,
    "equipmentType" TEXT NOT NULL,
    "numberOfClubs" INTEGER,
    "estimatedValue" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "pickupDate" DATETIME,
    "deliveryDate" DATETIME,
    "estimatedDelivery" DATETIME NOT NULL,
    "actualDelivery" DATETIME,
    "basePrice" REAL NOT NULL,
    "insuranceFee" REAL NOT NULL DEFAULT 0,
    "totalPrice" REAL NOT NULL,
    "discountApplied" REAL NOT NULL DEFAULT 0,
    "deliveredOnTime" BOOLEAN,
    "customerRating" INTEGER,
    CONSTRAINT "Shipment_destinationCourseId_fkey" FOREIGN KEY ("destinationCourseId") REFERENCES "GolfCourse" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Shipment_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DamageClaim" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "claimNumber" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FILED',
    "filedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" DATETIME,
    "damageType" TEXT NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "claimAmount" REAL NOT NULL,
    "approvedAmount" REAL,
    CONSTRAINT "DamageClaim_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "originCity" TEXT NOT NULL,
    "originState" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "destinationState" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "carrierId" TEXT NOT NULL,
    "avgDeliveryDays" REAL NOT NULL,
    "avgPrice" REAL NOT NULL,
    "shipmentCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Route_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "GolfCourse_partnershipTier_idx" ON "GolfCourse"("partnershipTier");

-- CreateIndex
CREATE INDEX "GolfCourse_shippingVolume_idx" ON "GolfCourse"("shippingVolume");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_name_key" ON "Carrier"("name");

-- CreateIndex
CREATE INDEX "Carrier_name_idx" ON "Carrier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_shipmentNumber_key" ON "Shipment"("shipmentNumber");

-- CreateIndex
CREATE INDEX "Shipment_status_idx" ON "Shipment"("status");

-- CreateIndex
CREATE INDEX "Shipment_createdAt_idx" ON "Shipment"("createdAt");

-- CreateIndex
CREATE INDEX "Shipment_carrierId_idx" ON "Shipment"("carrierId");

-- CreateIndex
CREATE INDEX "Shipment_destinationCourseId_idx" ON "Shipment"("destinationCourseId");

-- CreateIndex
CREATE UNIQUE INDEX "DamageClaim_claimNumber_key" ON "DamageClaim"("claimNumber");

-- CreateIndex
CREATE INDEX "DamageClaim_shipmentId_idx" ON "DamageClaim"("shipmentId");

-- CreateIndex
CREATE INDEX "DamageClaim_status_idx" ON "DamageClaim"("status");

-- CreateIndex
CREATE INDEX "Route_carrierId_idx" ON "Route"("carrierId");
