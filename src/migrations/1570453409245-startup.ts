import {MigrationInterface, QueryRunner} from "typeorm";

export class startup1570453409245 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" ADD "status" character varying NOT NULL DEFAULT 'NOT_DEPEND'`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" ALTER COLUMN "grayscaleAlgorithm" SET DEFAULT 'NONE'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" ALTER COLUMN "grayscaleAlgorithm" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "suite" DROP COLUMN "status"`, undefined);
    }

}
