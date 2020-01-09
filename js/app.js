
document.getElementById('formTask').addEventListener('submit',saveTask);


function saveTask(e){
   
    const title=document.getElementById('title').value;

    const description=document.getElementById('description').value;

    //Objeto task
    const task={
        title,
        description
    };
    
    //Se asigna como clave valor, se almacena como un objeto
    //localStorage.setItem('tasks',task);

    //JSON stringify convierte un objeto a string
    //localStorage.setItem('tasks',JSON.stringify(task));

    if (localStorage.getItem('tareas') === null){
        let tareas=[];

        tareas.push(task);
        localStorage.setItem('tareas',JSON.stringify(tareas));
        
    }else{
        //JSON.parse convierte un string a objeto
        const tareas=JSON.parse(localStorage.getItem('tareas'));
        tareas.push(task);
        localStorage.setItem('tareas',JSON.stringify(tareas));
    }

    //para que se obtengan las tareas sin tener quw volver a recargar la página
    getTask();

    //refresca el formulario una vez guardado los datos
    document.getElementById('formTask').reset();
    //Omitir envio de info del href
    e.preventDefault();
}

function getTask(){

    let tasks= JSON.parse( localStorage.getItem('tareas'));
   
    let idTask= document.getElementById('tasks');

    idTask.innerHTML='';
    
    for(let i=0;i<tasks.length;i++){

        let title=tasks[i].title;
        let description=tasks[i].description;

        idTask.innerHTML +=`<div class="card mb-3">
            <div class="card-body">
                <p> ${title}-${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Eliminar</a>
            </div>
        </div>
        `;
    }



}

function deleteTask(title){
    
    let tareas = JSON.parse(localStorage.getItem('tareas'));

    for(let i=0;i<tareas.length;i++){
        if(tareas[i].title==title){
           tareas.splice(i,1);
        }
    }
    localStorage.setItem('tareas',JSON.stringify(tareas));//volver a guardar
    getTask();

}

getTask();