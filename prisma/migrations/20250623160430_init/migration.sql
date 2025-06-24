/*
  Warnings:

  - You are about to drop the `SurveyResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SurveyResponse";

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "department" TEXT,
    "position" TEXT,
    "pcReference" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laptops" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "price_type" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "battery_life" DECIMAL(4,1) NOT NULL,
    "performance_score" DECIMAL(3,1) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "laptops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laptop_profiles" (
    "laptop_id" TEXT NOT NULL,
    "profile" TEXT NOT NULL,

    CONSTRAINT "laptop_profiles_pkey" PRIMARY KEY ("laptop_id","profile")
);

-- CreateTable
CREATE TABLE "laptop_os" (
    "laptop_id" TEXT NOT NULL,
    "os" TEXT NOT NULL,

    CONSTRAINT "laptop_os_pkey" PRIMARY KEY ("laptop_id","os")
);

-- CreateTable
CREATE TABLE "accessories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "price_type" TEXT NOT NULL,
    "image" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "laptop_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price_type" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_to" TEXT,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_accessories" (
    "package_id" TEXT NOT NULL,
    "accessory_id" TEXT NOT NULL,

    CONSTRAINT "package_accessories_pkey" PRIMARY KEY ("package_id","accessory_id")
);

-- CreateTable
CREATE TABLE "package_assignments" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "pc_reference" TEXT,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "package_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "download_url" TEXT,
    "installation_notes" TEXT,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "popularity" INTEGER,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tool_alternatives" (
    "tool_id" TEXT NOT NULL,
    "alternative" TEXT NOT NULL,

    CONSTRAINT "tool_alternatives_pkey" PRIMARY KEY ("tool_id","alternative")
);

-- CreateTable
CREATE TABLE "toolkits" (
    "id" TEXT NOT NULL,
    "profile_name" TEXT NOT NULL,
    "description" TEXT,
    "operating_system" TEXT NOT NULL,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "toolkits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toolkit_tools" (
    "toolkit_id" TEXT NOT NULL,
    "tool_id" TEXT NOT NULL,

    CONSTRAINT "toolkit_tools_pkey" PRIMARY KEY ("toolkit_id","tool_id")
);

-- CreateTable
CREATE TABLE "survey_responses" (
    "id" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "primary_role" TEXT,
    "development_percentage" INTEGER,
    "primary_os" TEXT,
    "experience_with_other_os" TEXT[],
    "preferred_os" TEXT,
    "os_preference_reason" TEXT,
    "programming_languages" TEXT[],
    "other_languages" TEXT,
    "development_type" TEXT[],
    "other_development_type" TEXT,
    "resource_intensive_environments" BOOLEAN,
    "multiple_environments" BOOLEAN,
    "terminal_importance" INTEGER,
    "client_presentation_frequency" TEXT,
    "large_data_models" BOOLEAN,
    "specialized_software" BOOLEAN,
    "specialized_software_list" TEXT,
    "battery_life_importance" INTEGER,
    "remote_work_frequency" TEXT,
    "selected_tools" TEXT[],
    "other_tools" TEXT,
    "simultaneous_applications" TEXT,
    "multiple_workspaces" BOOLEAN,
    "typical_browser_tabs" TEXT,
    "external_displays" TEXT,
    "resource_intensive_apps" BOOLEAN,
    "resource_intensive_apps_list" TEXT,
    "matched_toolkit_id" TEXT,
    "match_score" INTEGER,

    CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");

-- CreateIndex
CREATE UNIQUE INDEX "package_assignments_package_id_person_id_key" ON "package_assignments"("package_id", "person_id");

-- AddForeignKey
ALTER TABLE "laptop_profiles" ADD CONSTRAINT "laptop_profiles_laptop_id_fkey" FOREIGN KEY ("laptop_id") REFERENCES "laptops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laptop_os" ADD CONSTRAINT "laptop_os_laptop_id_fkey" FOREIGN KEY ("laptop_id") REFERENCES "laptops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_laptop_id_fkey" FOREIGN KEY ("laptop_id") REFERENCES "laptops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_accessories" ADD CONSTRAINT "package_accessories_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_accessories" ADD CONSTRAINT "package_accessories_accessory_id_fkey" FOREIGN KEY ("accessory_id") REFERENCES "accessories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_assignments" ADD CONSTRAINT "package_assignments_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_assignments" ADD CONSTRAINT "package_assignments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tool_alternatives" ADD CONSTRAINT "tool_alternatives_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toolkit_tools" ADD CONSTRAINT "toolkit_tools_toolkit_id_fkey" FOREIGN KEY ("toolkit_id") REFERENCES "toolkits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toolkit_tools" ADD CONSTRAINT "toolkit_tools_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_matched_toolkit_id_fkey" FOREIGN KEY ("matched_toolkit_id") REFERENCES "toolkits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
