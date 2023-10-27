class Task {
  id?: string;
  title: string;
  description: string;
  isFinished: boolean;
  userId: string;

  private constructor({ id, title, description, isFinished, userId }: Task) {
    return Object.assign(this, {
      id,
      title,
      description,
      isFinished,
      userId,
    });
  }

  static create({ id, title, description, isFinished, userId }: Task) {
    const task = new Task({ id, title, description, isFinished, userId });
    return task;
  }
}

export { Task };
