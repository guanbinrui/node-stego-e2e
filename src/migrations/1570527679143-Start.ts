import {MigrationInterface, QueryRunner} from "typeorm";

export class Start1570527679143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "suite" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'NOT_DEPEND', "fbUrl" character varying NOT NULL, "vendorUrl" character varying NOT NULL, "text" character varying NOT NULL, "pass" character varying NOT NULL, "clip" integer NOT NULL DEFAULT 0, "copies" integer NOT NULL DEFAULT 3, "size" integer NOT NULL DEFAULT 8, "tolerance" integer NOT NULL DEFAULT 128, "version" character varying NOT NULL DEFAULT '', "transformAlgorithm" character varying NOT NULL, "grayscaleAlgorithm" character varying NOT NULL DEFAULT 'NONE', "imageId" integer, CONSTRAINT "REL_5273a5e234dd72d0202460b16b" UNIQUE ("imageId"), CONSTRAINT "PK_30dc0252fd337d970ccf23129b2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ADD CONSTRAINT "FK_5273a5e234dd72d0202460b16b6" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" DROP CONSTRAINT "FK_5273a5e234dd72d0202460b16b6"`, undefined);
        await queryRunner.query(`DROP TABLE "suite"`, undefined);
    }

}
