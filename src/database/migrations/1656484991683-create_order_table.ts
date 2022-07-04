import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrderTable1656484991683 implements MigrationInterface {
    name = 'createOrderTable1656484991683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transaction_id" character varying NOT NULL, "status" character varying NOT NULL, "order_date" TIMESTAMP NOT NULL, "subtotal" integer NOT NULL, "tax_amount" integer NOT NULL, "total" integer NOT NULL, "customer_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "price" integer NOT NULL, "product_variant_name" character varying NOT NULL, "order_id" uuid, "product_id" uuid, CONSTRAINT "PK_01a7c973d9f30479647e44f9892" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line" ADD CONSTRAINT "FK_ed8fae6d7239e9d730219215af7" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line" ADD CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_line" DROP CONSTRAINT "FK_4526de8c78faf508b2ef1e84366"`);
        await queryRunner.query(`ALTER TABLE "order_line" DROP CONSTRAINT "FK_ed8fae6d7239e9d730219215af7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`DROP TABLE "order_line"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
