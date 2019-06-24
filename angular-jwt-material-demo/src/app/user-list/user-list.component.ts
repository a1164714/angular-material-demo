import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";
import { UserService } from "./user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  user$: Observable<User[]>;

  // 已勾选的机构Id
  selectedOrgIds = [1, 3];
  // 所有的机构信息
  orgList: any[] = [
    { id: 1, name: "org1" },
    { id: 2, name: "org2" },
    { id: 3, name: "org3" },
    { id: 4, name: "org4" }
  ];

  constructor(private users: UserService) { }

  ngOnInit() {
    this.user$ = this.users.getUsers();
  }

  /**
   * 展示选择的机构
   */
  showSelectOrgList() {
    console.log(this.selectedOrgIds);
  }

  /**
   * 机构勾选与反勾选
   * @param checked 勾选还是不勾选
   * @param id 机构Id
   */
  selectOrg(checked, id) {
    if (checked) {
      this.selectedOrgIds.push(id);
    } else {
      this.selectedOrgIds = this.selectedOrgIds.filter(orgId => orgId !== id);
    }
  }

  /**
   * 判断是否需要勾选
   * @param id 机构Id
   */
  checkSelected(id): boolean {
    return this.selectedOrgIds.find(orgId => id === orgId) ? true : false;
  }

  /**
   * 清空
   */
  clear() {
    this.selectedOrgIds = [];
  }

  /**
   * 全选
   */
  selectAll() {
    this.selectedOrgIds = this.orgList.map(org => org.id);
  }
}
