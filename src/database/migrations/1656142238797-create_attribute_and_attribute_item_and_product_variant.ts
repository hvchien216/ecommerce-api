import {MigrationInterface, QueryRunner} from "typeorm";

export class createAttributeAndAttributeItemAndProductVariant1656142238797 implements MigrationInterface {
    name = 'createAttributeAndAttributeItemAndProductVariant1656142238797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "deletedAt" TIMESTAMP, "product_id" uuid, CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "attribute_id" uuid, CONSTRAINT "PK_f60d140216e81368589091d1b3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attributes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "product_id" uuid, CONSTRAINT "PK_32216e2e61830211d3a5d7fa72c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variants_attribute_item" ("attribute_item_id" uuid NOT NULL, "product_variant_id" uuid NOT NULL, CONSTRAINT "PK_fe042bea1b7e4f0072da36e4295" PRIMARY KEY ("attribute_item_id", "product_variant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ead476981388b83764828199b1" ON "product_variants_attribute_item" ("attribute_item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa0992c8552fcdfabaeabc1337" ON "product_variants_attribute_item" ("product_variant_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price_min" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price_max" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'DEACTIVATED'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_item" ADD CONSTRAINT "FK_e42451cf3d0347f442d4bbe5809" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attributes" ADD CONSTRAINT "FK_ee72bcd96b170ccecea5599f072" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variants_attribute_item" ADD CONSTRAINT "FK_ead476981388b83764828199b1c" FOREIGN KEY ("attribute_item_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_variants_attribute_item" ADD CONSTRAINT "FK_aa0992c8552fcdfabaeabc13377" FOREIGN KEY ("product_variant_id") REFERENCES "attribute_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variants_attribute_item" DROP CONSTRAINT "FK_aa0992c8552fcdfabaeabc13377"`);
        await queryRunner.query(`ALTER TABLE "product_variants_attribute_item" DROP CONSTRAINT "FK_ead476981388b83764828199b1c"`);
        await queryRunner.query(`ALTER TABLE "attributes" DROP CONSTRAINT "FK_ee72bcd96b170ccecea5599f072"`);
        await queryRunner.query(`ALTER TABLE "attribute_item" DROP CONSTRAINT "FK_e42451cf3d0347f442d4bbe5809"`);
        await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'IN_STOCK'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price_max"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price_min"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa0992c8552fcdfabaeabc1337"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ead476981388b83764828199b1"`);
        await queryRunner.query(`DROP TABLE "product_variants_attribute_item"`);
        await queryRunner.query(`DROP TABLE "attributes"`);
        await queryRunner.query(`DROP TABLE "attribute_item"`);
        await queryRunner.query(`DROP TABLE "product_variants"`);
    }

}
