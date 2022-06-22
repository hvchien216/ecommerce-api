import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteatForCategoryTable1655879786742 implements MigrationInterface {
    name = 'addDeleteatForCategoryTable1655879786742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deletedAt"`);
    }

}
