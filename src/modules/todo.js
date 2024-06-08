export default class todoItem {
    constructor(title = "default", description = "", dueDate ='', priority = "low", checklist = true) {
        this.title = title, 
        this.description = description, 
        this.dueDate = dueDate, 
        this.priority = priority,
        this.checklist = checklist
    }
    checklistStatus() {this.checklist = !this.checklist}
}


