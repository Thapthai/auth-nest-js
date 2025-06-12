-- CreateTable
CREATE TABLE `sale_offices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `site_code` VARCHAR(191) NOT NULL,
    `site_office_name_th` VARCHAR(191) NOT NULL,
    `site_office_name_en` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_code` VARCHAR(191) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `group_code` VARCHAR(191) NOT NULL,
    `ship_id` INTEGER NOT NULL,
    `is_default` BOOLEAN NOT NULL,
    `name_th` VARCHAR(191) NOT NULL,
    `name_en` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factory_sale_office` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_office_id` INTEGER NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `post` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `tax_id` INTEGER NOT NULL,
    `name_th` VARCHAR(191) NOT NULL,
    `name_en` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facetory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_office_id` INTEGER NOT NULL,
    `factory_sale_office_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_code` INTEGER NOT NULL,
    `material_name_th` VARCHAR(191) NOT NULL,
    `material_name_en` VARCHAR(191) NOT NULL,
    `long_meterial_name` VARCHAR(191) NOT NULL,
    `material_type_id` INTEGER NOT NULL,
    `material_unit_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_units_meaures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_id` INTEGER NOT NULL,
    `packing` VARCHAR(191) NOT NULL,
    `qty` DOUBLE NOT NULL,
    `countable_unit_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_id` INTEGER NOT NULL,
    `saleoffice_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `item_category_id` INTEGER NOT NULL,
    `stock_location_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `qr_code_number` VARCHAR(191) NOT NULL,
    `product_lot_number` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `stock_location_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_prices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dirties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dirty_doc_no` VARCHAR(191) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `signature` VARCHAR(191) NOT NULL,
    `sign_factory` VARCHAR(191) NOT NULL,
    `sign_factory_time` DATETIME(3) NOT NULL,
    `sign_NH` VARCHAR(191) NOT NULL,
    `sign_NH_time` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dirty_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dirty_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `receive_qty` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `is_cancel` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_group_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_office_id` INTEGER NOT NULL,
    `customer_group_type_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `site_short_code` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shelfcounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_office_id` INTEGER NOT NULL,
    `doc_no` INTEGER NOT NULL,
    `doc_date` DATETIME(3) NOT NULL,
    `shelfcount_doc_no` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `is_request` BOOLEAN NOT NULL,
    `delivery_time` DATETIME(3) NOT NULL,
    `sc_time` DATETIME(3) NOT NULL,
    `is_mobile` BOOLEAN NOT NULL,
    `complete_user` VARCHAR(191) NOT NULL,
    `complete_date` DATETIME(3) NOT NULL,
    `cancel_user_id` INTEGER NOT NULL,
    `cancel_remark` VARCHAR(191) NOT NULL,
    `site_short_code` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shelfcount_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shelfcount_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `par_qty` DOUBLE NOT NULL,
    `cc_qty` DOUBLE NOT NULL,
    `total_qty` DOUBLE NOT NULL,
    `over_par` DOUBLE NOT NULL,
    `short` DOUBLE NOT NULL,
    `over` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `category_price` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `damages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_no` VARCHAR(191) NOT NULL,
    `doc_date` DATETIME(3) NOT NULL,
    `ref_doc_no` VARCHAR(191) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `sign_factory` VARCHAR(191) NOT NULL,
    `sign_NH` VARCHAR(191) NOT NULL,
    `sign_factory_time` DATETIME(3) NOT NULL,
    `sign_NH_time` DATETIME(3) NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `damage_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `damage_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `is_cancel` BOOLEAN NOT NULL,
    `is_checklist` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `site_short_code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `new_linens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_no` VARCHAR(191) NOT NULL,
    `doc_date` DATETIME(3) NOT NULL,
    `ref_doc_no` VARCHAR(191) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `is_recive` BOOLEAN NOT NULL,
    `receive_date` DATETIME(3) NOT NULL,
    `receive_detail` VARCHAR(191) NOT NULL,
    `is_process` BOOLEAN NOT NULL,
    `sign_factory` VARCHAR(191) NOT NULL,
    `sign_NH` VARCHAR(191) NOT NULL,
    `sign_factory_time` DATETIME(3) NOT NULL,
    `sign_NH_time` DATETIME(3) NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `new_linen_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `new_linen_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `receive_qty` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `is_cancel` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_washs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_no` VARCHAR(191) NOT NULL,
    `doc_date` DATETIME(3) NOT NULL,
    `ref_doc_no` VARCHAR(191) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `clean_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `is_recive` BOOLEAN NOT NULL,
    `receive_date` DATETIME(3) NOT NULL,
    `receive_detail` VARCHAR(191) NOT NULL,
    `is_process` BOOLEAN NOT NULL,
    `sign_factory` VARCHAR(191) NOT NULL,
    `sign_NH` VARCHAR(191) NOT NULL,
    `sign_factory_time` DATETIME(3) NOT NULL,
    `sign_NH_time` DATETIME(3) NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_wash_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repair_wash_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `receive_qty` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `is_cancel` BOOLEAN NOT NULL,
    `is_checklist` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cleans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clean_doc_no` VARCHAR(191) NOT NULL,
    `doc_date` DATETIME(3) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `dirty_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `signature` VARCHAR(191) NOT NULL,
    `sign_factory` VARCHAR(191) NOT NULL,
    `sign_NH` VARCHAR(191) NOT NULL,
    `sign_factory_time` DATETIME(3) NOT NULL,
    `sign_NH_time` DATETIME(3) NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clean_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clean_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `request_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `return_washs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_no` VARCHAR(191) NOT NULL,
    `doc_date` DATETIME(3) NOT NULL,
    `ref_doc_no` VARCHAR(191) NOT NULL,
    `sale_office_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `dirty_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `signature` VARCHAR(191) NOT NULL,
    `sign_factory` VARCHAR(191) NOT NULL,
    `sign_NH` VARCHAR(191) NOT NULL,
    `sign_factory_time` DATETIME(3) NOT NULL,
    `sign_NH_time` DATETIME(3) NOT NULL,
    `factory_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `retrun_wash_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `return_wash_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `is_cancel` BOOLEAN NOT NULL,
    `is_checklist` BOOLEAN NOT NULL,
    `request_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
