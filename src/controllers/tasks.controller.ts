import { getConnection } from "../database";
import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { Task } from "../models/tasks";
import { CustomError } from "../errors/errorHandler";

export const getTasks = (req: Request, res: Response) => {
  const tasks = getConnection().get("tasks");
  return res.status(200).json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  if (!id)
    return res
      .status(401)
      .json({ ok: false, data: { message: "No hay  id o es invalido" } });
  const task = getConnection()
    .get("tasks")
    .find({ id })
    .value();

  return res.status(200).json({ ok: true, data: { task } });
};

export const createTask = (req: Request, res: Response) => {
  const newTask: Task = {
    id: v4(),
    name: req.body.name,
    description: req.body.description
  };

  if (!newTask.name || !newTask.description)
    return res
      .status(401)
      .json({ ok: false, data: { message: "No hay  id o es invalido" } });

  const result = getConnection()
    .get("tasks")
    .push(newTask)
    .write();
  if (!result)
    return res.status(401).json({
      ok: false,
      data: { message: "Poblemas en el servidor al guardar su TASK" }
    });

  // si esta todo OK ..
  return res.status(200).json({ ok: true, data: { newTask } });
};
// ===================================================
// USANDO ErrorHandler Central
// ===================================================

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validar luego si es UUID valido .. El actual filtro es inutil
    if (!id) throw new CustomError(400, "Id Invalido");

    // Validar si name y descripcion son validos
    // asdaksjdklasjdlkasjdlkasjdlk

    const newTask = getConnection()
      .get("tasks")
      .find({ id })
      .assign(req.body)
      .write();

    // Si no hay ID en la respuesta ... Hubo Error
    if (!newTask.id) throw new CustomError(500, "Algo salio mal");

    return res.status(200).json({ ok: true, data: { newTask } });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskRemoved = getConnection().get('tasks').remove({id:req.params.id}).write();
    return res.status(200).json({ok:true,data:{taskRemoved}})
  } catch (error) {
    next(error);
  }
};
