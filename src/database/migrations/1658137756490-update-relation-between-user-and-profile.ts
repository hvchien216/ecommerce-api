import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelationBetweenUserAndProfile1658137756490 implements MigrationInterface {
    name = 'updateRelationBetweenUserAndProfile1658137756490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profileId" TO "profile_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_b1bda35cdb9a2c1b777f5541d87" TO "UQ_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "owner_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "UQ_c03f4f73d83362cabb34dfa9418" UNIQUE ("owner_id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "UQ_c03f4f73d83362cabb34dfa9418"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_23371445bd80cb3e413089551bf" TO "UQ_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profile_id" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
