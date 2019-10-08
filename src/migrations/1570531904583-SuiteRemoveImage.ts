import {MigrationInterface, QueryRunner} from "typeorm";

export class SuiteRemoveImage1570531904583 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" DROP CONSTRAINT "FK_5273a5e234dd72d0202460b16b6"`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" DROP CONSTRAINT "REL_5273a5e234dd72d0202460b16b"`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" DROP COLUMN "imageId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" ADD "imageId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ADD CONSTRAINT "REL_5273a5e234dd72d0202460b16b" UNIQUE ("imageId")`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ADD CONSTRAINT "FK_5273a5e234dd72d0202460b16b6" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
