import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class StockMigration1631106982564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'count',
            type: 'int',
          },
        ],
      })
    );
    await queryRunner.addColumn(
      'stocks',
      new TableColumn({
        name: 'productId',
        type: 'varchar',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('stocks');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
    await queryRunner.dropForeignKey('stocks', foreignKey);
    await queryRunner.dropColumn('stocks', 'productId');
    await queryRunner.dropTable('stocks');
  }
}
