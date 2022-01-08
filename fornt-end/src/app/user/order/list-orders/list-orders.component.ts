import { UserService } from './../../../shard/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  //properties
  public id: any;
  public listOrders: any;
  public errorMessage: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger:any = new Subject();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.id = this.route.snapshot.paramMap.get('id')
    this.userService.getListOrderUser(this.id).subscribe((res: any) => {
      this.listOrders = res.order
      this.dtTrigger.next();
      console.log(res);
      
    
    }, (err: any) => {
      if (err.status === 400) {
        this.errorMessage = err.error.error_en
      }
      if (err.status === 404) {
        this.errorMessage = err.error
      }
    })

  }

}
