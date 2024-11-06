-- CreateTable
CREATE TABLE "Organization" (
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "maxUsers" INTEGER NOT NULL,
    "aproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "organization" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "extrainfo" TEXT,
    "medic" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "nacimiento" DATE NOT NULL,
    "sexo" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spirometry" (
    "id" SERIAL NOT NULL,
    "patient" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "gold" BOOLEAN NOT NULL DEFAULT false,
    "gli" BOOLEAN NOT NULL DEFAULT false,
    "fev1" DOUBLE PRECISION,
    "fev1pred" DOUBLE PRECISION,
    "fvc" DOUBLE PRECISION,
    "fvcpred" DOUBLE PRECISION,
    "obstruction" INTEGER,
    "obstructionai" DOUBLE PRECISION,
    "restriction" INTEGER,
    "restrictionai" DOUBLE PRECISION,
    "correctionobsGold" INTEGER NOT NULL DEFAULT -1,
    "correctionobsGLI" INTEGER NOT NULL DEFAULT -1,
    "correctionresGold" INTEGER NOT NULL DEFAULT -1,
    "correctionresGLI" INTEGER NOT NULL DEFAULT -1,
    "enjson" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Spirometry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizationTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "medics" INTEGER NOT NULL,

    CONSTRAINT "organizationTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "organization" TEXT NOT NULL,

    CONSTRAINT "userTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patientTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extrainfo" TEXT,
    "medic" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "altura" INTEGER NOT NULL,
    "nacimiento" TIMESTAMP(3) NOT NULL,
    "sexo" INTEGER NOT NULL,

    CONSTRAINT "patientTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spirometryTable" (
    "id" TEXT NOT NULL,
    "obstruction" INTEGER NOT NULL,
    "obstructionai" DOUBLE PRECISION NOT NULL,
    "restriction" INTEGER NOT NULL,
    "restrictionai" DOUBLE PRECISION NOT NULL,
    "patient" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fev1" INTEGER NOT NULL,
    "fev1pred" INTEGER NOT NULL,
    "fvc" INTEGER NOT NULL,
    "fvcpred" INTEGER NOT NULL,
    "correctionobs" INTEGER,
    "correctionobsmed" INTEGER,
    "correctionres" INTEGER,
    "correctionresmed" INTEGER,
    "enjson" INTEGER,

    CONSTRAINT "spirometryTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organization_fkey" FOREIGN KEY ("organization") REFERENCES "Organization"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medic_fkey" FOREIGN KEY ("medic") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spirometry" ADD CONSTRAINT "Spirometry_patient_fkey" FOREIGN KEY ("patient") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTable" ADD CONSTRAINT "userTable_organization_fkey" FOREIGN KEY ("organization") REFERENCES "organizationTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patientTable" ADD CONSTRAINT "patientTable_medic_fkey" FOREIGN KEY ("medic") REFERENCES "userTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spirometryTable" ADD CONSTRAINT "spirometryTable_patient_fkey" FOREIGN KEY ("patient") REFERENCES "patientTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
