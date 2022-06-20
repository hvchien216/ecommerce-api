import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipBetweenStoreAndUser1655718010266 implements MigrationInterface {
    name = 'addRelationshipBetweenStoreAndUser1655718010266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stores_employees_users" ("storesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_c870f42032aeea9218d436c7ab3" PRIMARY KEY ("storesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bcdae9bc891414fdc36ba7c784" ON "stores_employees_users" ("storesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e82f40995117eb57c50adbb6d" ON "stores_employees_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "stores_employees_users" ADD CONSTRAINT "FK_bcdae9bc891414fdc36ba7c7846" FOREIGN KEY ("storesId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stores_employees_users" ADD CONSTRAINT "FK_5e82f40995117eb57c50adbb6d5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores_employees_users" DROP CONSTRAINT "FK_5e82f40995117eb57c50adbb6d5"`);
        await queryRunner.query(`ALTER TABLE "stores_employees_users" DROP CONSTRAINT "FK_bcdae9bc891414fdc36ba7c7846"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e82f40995117eb57c50adbb6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcdae9bc891414fdc36ba7c784"`);
        await queryRunner.query(`DROP TABLE "stores_employees_users"`);
    }

}
