import {MigrationInterface, QueryRunner} from "typeorm";

export class startup1570452692496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" ADD "imageId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ADD CONSTRAINT "UQ_5273a5e234dd72d0202460b16b6" UNIQUE ("imageId")`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ALTER COLUMN "version" SET DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ADD CONSTRAINT "FK_5273a5e234dd72d0202460b16b6" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" DROP CONSTRAINT "FK_5273a5e234dd72d0202460b16b6"`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ALTER COLUMN "version" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" DROP CONSTRAINT "UQ_5273a5e234dd72d0202460b16b6"`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" DROP COLUMN "imageId"`, undefined);
    }

}
