import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  // Atributos
  public taskListNoCompleted: any[];
  public taskListCompleted: any[];
  public showInputTask: boolean;
  public errorInput: boolean;
  public showCompleted: boolean;

  // Inicializo los atributos
  constructor() {
    this.taskListCompleted = [];
    this.taskListNoCompleted = [];
    this.showInputTask = false;
    this.errorInput = false;
    this.showCompleted = true;
  }

  ngOnInit() {
  }

  /**
   * Muestra el input para añadir una tarea
   */
  showInputTextTask() {
    this.showInputTask = true;
  }

  /**
   * Añade una tarea
   * @param description descripcion de la tarea 
   */
  addTask(description) {

    // Si la descripcion existe
    if (description) {
      // Creo la tarea
      // La fecha sera la actual y no estara completada
      const task: Task = {
        'date': new Date(),
        'description': description,
        'completed': false
      };

      // Añado la tarea al array de tareas no completadas
      this.taskListNoCompleted.push(task);
      // Reinicio los valores a falso
      this.errorInput = false;
      this.showInputTask = false;
    } else {
      // Indico que hay un error
      this.errorInput = true;
    }

  }

  /**
   * Elimino una tarea
   * @param $event indice de la tarea dentro del array
   */
  removeTask($event){
    this.taskListNoCompleted.splice($event, 1);
  }

  /**
   * Completa una tarea
   * @param $event indice de la tarea dentro del array
   */
  completeTask($event){
    // Recojo la tarea
    const task = this.taskListNoCompleted[$event];
    // Indico que esta completa
    task.completed = true;
    // Indico que se completo en la fecha actual
    task.date = new Date();
    // La elimino del array de tareas no completadas
    this.taskListNoCompleted.splice($event, 1);
    // Meto la tarea en el array de tareas completadas
    this.taskListCompleted.push(task);
  }

  /**
   * Muestra o oculta las tareas completadas
   */
  showTaskCompleted(){
    this.showCompleted = !this.showCompleted;
  }

}
