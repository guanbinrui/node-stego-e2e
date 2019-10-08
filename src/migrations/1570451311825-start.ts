import {MigrationInterface, QueryRunner} from "typeorm";

export class start1570451311825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "suite" ("id" SERIAL NOT NULL, "fbUrl" character varying NOT NULL, "vendorUrl" character varying NOT NULL, "text" character varying NOT NULL, "pass" character varying NOT NULL, "clip" integer NOT NULL DEFAULT 0, "copies" integer NOT NULL DEFAULT 3, "size" integer NOT NULL DEFAULT 8, "tolerance" integer NOT NULL DEFAULT 128, "version" character varying NOT NULL, "transformAlgorithm" character varying NOT NULL, "grayscaleAlgorithm" character varying NOT NULL, CONSTRAINT "PK_30dc0252fd337d970ccf23129b2" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "suite"`, undefined);
    }

}
