document.addEventListener("DOMContentLoaded",()=>{
    const storedtasks=JSON.parse(localStorage.getItem('tasks'))
    if(storedtasks){
        storedtasks.forEach((task)=>tasks.push(task))
        updatetaskslist()
    updatestats()
   }
})
let tasks = [];

const savetasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addtask = () => {
  const taskinput = document.getElementById("taskinput");
  const text = taskinput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskinput.value = "";
    updatetaskslist();
    updatestats();
    savetasks();
  }
};
const toggletaskcomplete=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    updatetaskslist();
    updatestats();
    savetasks();

};
const deletetask=(index)=>{
    tasks.splice(index,1);
    updatetaskslist();
    updatestats();
    savetasks();
};

const edittask=(index)=>{
    const taskinput=document.getElementById('taskinput')
    taskinput.value=tasks[index].text
    tasks.splice(index,1)
    updatetaskslist();
    updatestats();
    savetasks();
}

const updatestats=()=>{
    const completetasks=tasks.filter(task=>task.completed).length
    const totaltasks=tasks.length
    const progress=(completetasks/totaltasks)*100
    const progressbar=document.getElementById('progress')
    progressbar.style.width=`${progress}%`
    document.getElementById('numbers').innerText=`${completetasks}/${totaltasks}`;

    if(tasks.length && completetasks==totaltasks){
        blashconfeti();
    }
};
const updatetaskslist = () => {
  const tasklist = document.getElementById('task-list');

  tasklist.innerHTML = '';
  tasks.forEach((task,index) => {
    const listitem = document.createElement("li");
    listitem.innerHTML = `
 <div class="taskitem">
  <div class="task ${task.completed ? "completed":""}">
    <input type="checkbox" class="checkbox" ${
    task.completed ? "checked":""
    }>
    <p>${task.text}</p>
  </div>
  <div class="icons">
    <img src="./img/edit.png" alt="edit" onclick="edittask(${index})">
    <img src="./img/bin.png" alt="delete" onclick="deletetask(${index})">
  </div>
</div>
`;
listitem.addEventListener('change',()=> toggletaskcomplete(index));
tasklist.append(listitem);
  });
};

document.getElementById("newtask").addEventListener("click", function (e) {
  e.preventDefault();

  addtask();
});

const blashconfeti=()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
