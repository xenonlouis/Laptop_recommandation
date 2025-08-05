-- CreateTable
CREATE TABLE "package_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "profile_type" TEXT NOT NULL,
    "laptop_id" TEXT NOT NULL,
    "price_type" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "package_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_accessories" (
    "template_id" TEXT NOT NULL,
    "accessory_id" TEXT NOT NULL,

    CONSTRAINT "template_accessories_pkey" PRIMARY KEY ("template_id","accessory_id")
);

-- CreateTable
CREATE TABLE "person_assignments" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'assigned',
    "pc_reference" TEXT,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivered_at" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "person_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_assignments_person_id_template_id_key" ON "person_assignments"("person_id", "template_id");

-- AddForeignKey
ALTER TABLE "package_templates" ADD CONSTRAINT "package_templates_laptop_id_fkey" FOREIGN KEY ("laptop_id") REFERENCES "laptops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_accessories" ADD CONSTRAINT "template_accessories_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "package_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_accessories" ADD CONSTRAINT "template_accessories_accessory_id_fkey" FOREIGN KEY ("accessory_id") REFERENCES "accessories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_assignments" ADD CONSTRAINT "person_assignments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_assignments" ADD CONSTRAINT "person_assignments_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "package_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
