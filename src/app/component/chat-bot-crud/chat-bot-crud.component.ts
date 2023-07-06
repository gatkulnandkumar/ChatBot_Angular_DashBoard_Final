import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatDemoService } from 'src/app/services/chat-demo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ChatBot } from 'src/app/Model/chatbot.model';
import { DataTablesModule } from 'angular-datatables';
import { DialogComponent } from '../dialog/dialog.component';
import { globalUrl } from 'src/app/globalURL';



@Component({
  selector: 'app-chat-bot-crud',
  templateUrl: './chat-bot-crud.component.html',
  styleUrls: ['./chat-bot-crud.component.css']
})
export class ChatBotCrudComponent implements OnInit {

  // displayedColumns: string[] = ['id', 'message_type', 'message','next_action','context_id', 'execution_detail', 'payload', 'issue_types','Actions'];
  // dataSource!: MatTableDataSource<ChatBot>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;


  dialogRef!: MatDialogRef<DialogComponent>;

  constructor(public dialog: MatDialog, private http: HttpClient, private service: ChatDemoService, private router: Router, private authService: ChatDemoService) { }
  allEmpDetails: any;

  chatBotList: any[] = [];
  dtOptions: any = {};

  ngOnInit(): void {
    this.getAllTemplateData();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    // lengthMenu : [5, 10, 25],
    //   processing: true
    // };

  }
  // select All template data
  getAllTemplateData() {
    console.log("getAllTemplateData API call==>");
    this.service.getAllTemplate(globalUrl.getAllTemplateUrl).subscribe((res: any) => {
      console.log("getAllTemplateData::::", res);
      this.chatBotList = res;
      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25]
        });
      }, 1);
      // this.dataSource = new MatTableDataSource(res);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });

  }

  // logout application
  logout(): void {
    this.authService.logout();
  }

  // edit template
  editTempalte() {
    console.log("inside edit template here");
  }

  addTemplate() {
    console.log("into the session", sessionStorage.getItem('authGaurd'));
    if (sessionStorage.getItem('authGaurd')) {
      console.log("into the session after the cnd", sessionStorage.getItem('authGaurd'));
    }
    this.router.navigate(['/addTemplate']);
  }

//delete template
  deleteTempalteData(id: any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Delete the entry
        this.service.deleteTemplate(globalUrl.gateWayUrl,id).subscribe((res: any) => {
              console.log("getEmployee::::", res);
              this.chatBotList = res;
              this.getAllTemplateData();
            });
            window.location.reload();
      }
    });
    
  }

  //delete template without Diloag box
  // deleteTempalteData(id: any) {
  //   console.log("inside delete template");
  //   this.openDialog();
  //   //alert("Do you want to delete data");

  //   this.service.deleteTemplate(id).subscribe((res: any) => {
  //     console.log("getEmployee::::", res);
  //     this.chatBotList = res;
  //     this.getAllTemplateData();
  //   });
  //   // window.location.reload();
  // }


}
