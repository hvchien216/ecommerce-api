import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelationshipBetweenProductStoreCategory1655881748596 implements MigrationInterface {
    name = 'updateRelationshipBetweenProductStoreCategory1655881748596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ADD "store_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_68863607048a1abd43772b314ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_68863607048a1abd43772b314ef"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deletedAt"`);
    }

}
