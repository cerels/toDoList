(()=>{"use strict";const t=class{constructor(t){this.title=t,this.id=`project-${Date.now()}`,this.todos=[]}addTodo(t){this.todos.push(t)}removeTodo(t){this.todos.splice(t,1)}updateTitle(t){this.title=t}};class e{constructor(t="default",e="",o="",n="low",d=!0){this.title=t,this.description=e,this.dueDate=o,this.priority=n,this.checklist=d}checklistStatus(){this.checklist=!this.checklist}}let o=[new t("Project Alpha"),new t("Project Beta"),new t("Project Gamma")];o[0].addTodo(new e("Alpha Task 1","Description for Alpha Task 1")),o[0].addTodo(new e("Alpha Task 2","Description for Alpha Task 2")),o[1].addTodo(new e("Beta Task 1","Description for Beta Task 1")),o[2].addTodo(new e("Gamma Task 1","Description for Gamma Task 1")),document.addEventListener("DOMContentLoaded",(()=>{const n=document.getElementById("project-selector"),d=document.getElementById("project-title"),c=document.getElementById("todo-list"),i=document.getElementById("create-todo-button"),a=document.getElementById("create-project-button"),s=document.getElementById("delete-project-button");function r(){n.innerHTML="",o.forEach(((t,e)=>{const o=document.createElement("option");o.value=e,o.textContent=t.title,n.appendChild(o)}))}function l(t){const e=o[t];d.textContent=e.title,c.innerHTML="",e.todos.forEach(((e,o)=>{const n=document.createElement("div");n.className="todo-item",n.innerHTML=`\n                <strong>${e.title}</strong>\n                <p>${e.description}</p>\n                <button class="delete-todo" data-project-index="${t}" data-todo-index="${o}">Delete</button>\n            `,c.appendChild(n)})),document.querySelectorAll(".delete-todo").forEach((t=>{t.addEventListener("click",(t=>{!function(t,e){o[t].removeTodo(e),l(t)}(t.target.getAttribute("data-project-index"),t.target.getAttribute("data-todo-index"))}))}))}n.value=0,r(),l(0),n.addEventListener("change",(t=>{l(t.target.value)})),i.addEventListener("click",(()=>{const t=n.value,d=prompt("Enter the title for the new todo:"),c=prompt("Enter the description for the new todo:");if(d&&c){const n=new e(d,c);o[t].addTodo(n),l(t)}})),a.addEventListener("click",(()=>{const e=prompt("Enter the title for the new project:");if(e){const d=new t(e);o.push(d),r(),n.value=o.length-1,l(n.value)}})),s.addEventListener("click",(()=>{const t=n.value;confirm(`Are you sure you want to delete the project: ${o[t].title}?`)&&(o.splice(t,1),r(),n.value>=o.length&&o.length>0&&(n.value=o.length-1),o.length>0?l(n.value):(d.textContent="",c.innerHTML=""))}))}))})();