-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "primaryRole" TEXT,
    "developmentPercentage" INTEGER,
    "primaryOS" TEXT,
    "experienceWithOtherOS" TEXT[],
    "preferredOS" TEXT,
    "osPreferenceReason" TEXT,
    "programmingLanguages" TEXT[],
    "otherLanguages" TEXT,
    "developmentType" TEXT[],
    "otherDevelopmentType" TEXT,
    "resourceIntensiveEnvironments" BOOLEAN,
    "multipleEnvironments" BOOLEAN,
    "terminalImportance" INTEGER,
    "clientPresentationFrequency" TEXT,
    "largeDataModels" BOOLEAN,
    "specializedSoftware" BOOLEAN,
    "specializedSoftwareList" TEXT,
    "batteryLifeImportance" INTEGER,
    "remoteWorkFrequency" TEXT,
    "selectedTools" TEXT[],
    "otherTools" TEXT,
    "simultaneousApplications" TEXT,
    "multipleWorkspaces" BOOLEAN,
    "typicalBrowserTabs" TEXT,
    "externalDisplays" TEXT,
    "resourceIntensiveApps" BOOLEAN,
    "resourceIntensiveAppsList" TEXT,
    "matchedToolkitId" TEXT,
    "matchScore" INTEGER,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SurveyResponse_email_key" ON "SurveyResponse"("email");

-- CreateIndex
CREATE INDEX "SurveyResponse_email_idx" ON "SurveyResponse"("email");
