import {MigrationInterface, QueryRunner} from "typeorm";

export class createCategoriesTable1655866187883 implements MigrationInterface {
    name = 'createCategoriesTable1655866187883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "parent_id" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "decs"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "thumb"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "thumbnail" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "status" character varying NOT NULL DEFAULT 'IN_STOCK'`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_464f927ae360106b783ed0b4106"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "thumb" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "decs" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
