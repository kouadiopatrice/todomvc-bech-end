import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../domain/entities/todo.entity';
import { TodoRepositoryInterface } from '../domain/interfaces/todo-repository.interface';
import { TodoStatus } from '../application/dto/todo-status.enum';

@Injectable()
export class TodoRepository implements TodoRepositoryInterface {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(status: TodoStatus): Promise<Todo[]> {
    if (status === 'all') {
      return this.todoRepository.find();
    }

    return this.todoRepository.find({ where: { status: status } });
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async create(todoData: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepository.create(todoData);
    return this.todoRepository.save(todo);
  }

  async update(id: number, todoData: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, todoData);
    return this.todoRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
