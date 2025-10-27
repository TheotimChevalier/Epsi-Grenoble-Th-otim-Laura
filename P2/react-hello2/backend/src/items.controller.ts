import { Controller, Get } from '@nestjs/common';
import { getPool } from './db';

@Controller()
export class ItemsController {
  @Get('items')
  async getItems(): Promise<{ items: { id: number; name: string; value: number }[] }> {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, name, value FROM items ORDER BY id ASC');
    return { items: rows as any };
  }
}
