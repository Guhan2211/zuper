import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{

  todos:any=[];
  filteredTodos:any=[];
  users:any=[];
  actionsList:number[]=[];

    ngOnInit(): void {

      this.ls.gettoDos().subscribe(todo=>{
          this.todos=todo;
          this.filteredTodos=todo;

      });
      this.ls.getUsers().subscribe(user=>{
        this.users=user;


    })

    }

    constructor(private ls:ListService){

    }


    getUser(id:number){
      return this.users.filter((user:any)=>user.id===id).map((user:any)=>user.name);
    }


    search(event:any){

        console.log(event.value);

        this.filteredTodos=this.filterTodos(event.value)



    }

    changeCheck(event:any,id:number){

      const index = this.actionsList.indexOf(id);
      if (index > -1) {
        this.actionsList.splice(index, 1);
      }

      else{
      this.actionsList.push(id);

      }
       console.log(this.actionsList);


    }


    filterTodos(searchstr : string): any[] {
      const filteredObjects: any[] = this.todos.filter((obj:any) => {
        const objValues = Object.values(obj);
        for (const value of objValues) {
          if (typeof value === "string" && value.toLowerCase().includes(searchstr.toLowerCase())) {
            return true;
          }
        }
        return false;
      });

      return filteredObjects;
    }


    doAction(change:any){
        if(change!=null){
          //console.log(change.value);
          if(change.value=="change"){
            this.changeItems();
          }

          else{
            this.deleteItems();
          }

        }
    }

    deleteItems(){
      if(this.actionsList.length>0){
        let msg="Are you want to delete " + this.actionsList.length +" tasks?"

        if(confirm(msg)){
          this.actionsList.forEach(todo=>{
            const index = this.filteredTodos.findIndex((obj:any) => obj['id'] === todo);
            if (index > -1) {
              this.filteredTodos.splice(index, 1);
            }
          })
          this.actionsList=[];
        }
      }
      else{
        window.alert("No items selected!");
      }

    }

    changeItems(){
      if(this.actionsList.length){
        let msg="Are you want to change status " + this.actionsList.length +" tasks?"
        if(confirm(msg)){
          this.actionsList.forEach(todo=>{
            const index = this.filteredTodos.findIndex((obj:any) => obj['id'] === todo);
            if (index > -1) {
              this.filteredTodos[index]['completed']=!this.filteredTodos[index]['completed'];

              var checkbox:any =  document.getElementById("check_"+todo);
              if(checkbox){
                checkbox.checked=false;
              }


            }

          })
          this.actionsList=[];
        }
      }
      else{
        window.alert("No items selected!");
      }


    }


    setActionNull(){
      var selectoption:any =document.getElementById("selectAction");
      selectoption.value=null;
    }

}
