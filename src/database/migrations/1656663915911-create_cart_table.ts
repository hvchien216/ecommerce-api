import {MigrationInterface, QueryRunner} from "typeorm";

export class createCartTable1656663915911 implements MigrationInterface {
    name = 'createCartTable1656663915911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_line" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "product_variant_id" uuid NOT NULL, "store_id" uuid NOT NULL, CONSTRAINT "PK_0b3414ce0b103b3ff0743ebd3a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_acb3504612e79ff817af0e05ab0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_043bdd50ec195bb63df9f84a35d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_584efc8e568c0088304886ba1d2" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_643f665f24892fb2ed4e9e56ad6" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_643f665f24892fb2ed4e9e56ad6"`);
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_584efc8e568c0088304886ba1d2"`);
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_043bdd50ec195bb63df9f84a35d"`);
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_acb3504612e79ff817af0e05ab0"`);
        await queryRunner.query(`DROP TABLE "cart_line"`);
    }

}
