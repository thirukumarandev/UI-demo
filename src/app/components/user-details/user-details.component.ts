import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
dataSource =[];
displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website'];
// dataSource = this.userList;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUserDetails(){
    this.userService.getUser().subscribe((data) =>{
      console.log('Get User')
      this.dataSource = data;
      console.log(this.dataSource);
    })
  }

}
