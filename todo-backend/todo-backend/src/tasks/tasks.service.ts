// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Importe NotFoundException

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'DONE';
}

@Injectable()
export class TasksService {
  // Remova 'readonly' se você pretende reatribuir o array (como em 'remove')
  // Se você *precisa* de 'readonly' aqui, então o método 'remove' precisaria usar splice.
  private tasks: Task[] = []; // Array em memória para simular o DB
  private nextId = 1; // Começaremos IDs do 1

  // Para demonstração, vamos adicionar alguns produtos iniciais
  constructor() {
    this.createTask('Estudar ENEM', 'Vídeo Aula de Física');
    this.createTask('Arrumar o Quarto', 'Organizar o Guarda Roupa e Cama');
    this.createTask('Compras Mercado', 'Seguir Lista de Compras do Mês');
  }

  // -------------------------------- CRUD ---------------------------------------------

  //GET -> Retorna TODAS as tarefas
  findAll(): Task[] {
    return this.tasks; // Retorna o array de produtos
  }
  // GET ->  Retorna UMA tarefa pelo ID
  // Corrigido: Retorna tasks | undefined, pois o produto pode não ser encontrado
  findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  // Alternativa para findOne: Lança um erro se o produto não for encontrado
  findOneOrThrow(id: string): Task {
    const task = this.tasks.find((p) => p.id === id);
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }
    return task;
  }

  //POST -> Cria uma nova tarefa
  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: 'PENDING',
    };
    this.tasks.push(newTask);
    return newTask;
  }

  //PATCH ->  Edita uma tarefa ESPECÍFICA pelo ID
  // Corrigido: Retorna tasks | undefined, pois o produto pode não ser encontrado
  update(
    id: string,
    task: { title?: string; description?: string; status?: 'PENDING' },
  ): Task | undefined {
    const index = this.tasks.findIndex((p) => p.id === id);
    if (index > -1) {
      this.tasks[index] = { ...this.tasks[index], ...task };
      return this.tasks[index];
    }
    return undefined; // Retorna undefined se não encontrou (ou lance um erro)
  }

  // Alternativa para update: Lança um erro se o produto não for encontrado
  updateOrThrow(
    id: string,
    task: { title?: string; description?: string },
  ): Task {
    const index = this.tasks.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Tarefa com ID ${id} não encontrada para atualização.`,
      );
    }
    this.tasks[index] = { ...this.tasks[index], ...task };
    return this.tasks[index];
  }

  //DELETE -> Exclui uma tarefa ESPECÍFICA pelo ID
  // Corrigido: 'tasks' não pode ser 'readonly' se você for reatribuí-lo
  remove(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((p) => p.id !== id); // Reatribuição do array
    return this.tasks.length < initialLength; // Retorna true se um produto foi removido
  }

  // Alternativa para remove: Lança um erro se o produto não for encontrado
  removeOrThrow(id: string): void {
    const index = this.tasks.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Tarefa com ID ${id} não encontrada para remoção.`,
      );
    }
    this.tasks.splice(index, 1); // Remove no local
  }
}
