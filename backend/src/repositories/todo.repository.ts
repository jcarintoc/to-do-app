import db from "../db/database.js";
import type { Todo } from "../types/index.js";

export class TodoRepository {
  findAllByUserId(userId: number): Todo[] {
    return db
      .prepare("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC")
      .all(userId) as Todo[];
  }

  findById(id: number): Todo | undefined {
    return db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as Todo | undefined;
  }

  findByIdAndUserId(id: number, userId: number): Todo | undefined {
    return db
      .prepare("SELECT * FROM todos WHERE id = ? AND user_id = ?")
      .get(id, userId) as Todo | undefined;
  }

  create(userId: number, title: string): Todo {
    const result = db
      .prepare("INSERT INTO todos (user_id, title) VALUES (?, ?)")
      .run(userId, title);
    return this.findById(result.lastInsertRowid as number) as Todo;
  }

  update(id: number, userId: number, data: { title?: string; completed?: number }): Todo | undefined {
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (data.title !== undefined) {
      updates.push("title = ?");
      values.push(data.title);
    }

    if (data.completed !== undefined) {
      updates.push("completed = ?");
      values.push(data.completed);
    }

    if (updates.length === 0) {
      return this.findByIdAndUserId(id, userId);
    }

    values.push(id, userId);

    db.prepare(`UPDATE todos SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`).run(
      ...values
    );

    return this.findById(id);
  }

  delete(id: number, userId: number): boolean {
    const result = db
      .prepare("DELETE FROM todos WHERE id = ? AND user_id = ?")
      .run(id, userId);
    return result.changes > 0;
  }
}

export const todoRepository = new TodoRepository();
