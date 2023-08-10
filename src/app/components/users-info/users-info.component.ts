import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, Subscription, take } from 'rxjs';
import { User, UserResponse } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import {
  addUserToData,
  removeUser,
  updateUser,
} from 'src/app/store/actions/users.actions';
import { selectUsers } from 'src/app/store/selectors/users.selctors';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss'],
  // providers: [MessageService],
})
export class UsersInfoComponent implements OnInit {
  newUser: FormGroup = new FormGroup({});
  userForm: FormGroup = new FormGroup({});
  users$!: Observable<UserResponse>;
  usersSubscription!: Subscription;
  users: User[] = [];
  tableUsers: User[] = [];
  selectedUser!: User;
  // filters
  idFilter = '';
  emailFilter = '';
  firstNameFilter = '';
  lastNameFilter = '';
  // dialog
  addUser: boolean = false;
  removeUserDialog: boolean = false;
  showUserInfo: boolean = false;
  userUpdate: boolean = false;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // getting data from the store
    this.users$ = this.store.select(selectUsers);
    this.usersSubscription = this.users$.subscribe((users) => {
      this.users = users.data;
      // Create a new mutable array
      this.tableUsers = [...this.users];
    });

    // create new user form
    this.newUser = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
    // create userdata form
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }
  // table filteration

  filterTable() {
    this.store.pipe(select(selectUsers), take(1)).subscribe((users) => {
      this.users = users.data.filter((user) => {
        return (
          user.id
            .toString()
            .toLowerCase()
            .includes(this.idFilter.toLowerCase()) &&
          user.email.toLowerCase().includes(this.emailFilter.toLowerCase()) &&
          user.first_name
            .toLowerCase()
            .includes(this.firstNameFilter.toLowerCase()) &&
          user.last_name
            .toLowerCase()
            .includes(this.lastNameFilter.toLowerCase())
        );
      });
    });
  }

  // show adding new user pop-up
  showAddUserDialog() {
    this.addUser = true;
  }
  // cancel adding new user
  onCancel() {
    this.addUser = false;
  }
  // show remove user dialog
  removeUser(id: number) {
    this.userService.removeUser(id).subscribe((res) => {
      console.log('res', res);
      this.store.dispatch(removeUser({ id: id }));
      this.messageService.add({
        severity: 'success',
        summary: 'User Removed',
        detail: `User with id ${id} has been removed successfully.`,
      });
    });
  }
  // add user data
  addNewUser() {
    // extract name and job from form
    const { name, job } = this.newUser.value;
    this.userService.addUser(name, job).subscribe((res) => {
      this.addUser = false;
      this.newUser.reset();

      // add new user to the store
      this.store.dispatch(addUserToData({ user: res }));
      // add toaster message here
      this.messageService.add({
        severity: 'success',
        summary: 'User Added',
        detail: `User with id ${res.id} has been added successfully.`,
      });
    });
  }
  // show user info dialog
  showUserInfoDialog(user: User, update: boolean) {
    this.selectedUser = user;
    this.showUserInfo = true;
    // if update is true then set all the form values to the user data and if not also do the same but lock all the input fields
    if (update) {
      this.userForm.setValue({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        job: '',
      });
      this.userUpdate = true;
    } else {
      this.userForm.setValue({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        job: '',
      });
      this.userForm.disable();
      this.userUpdate = false;
    }
  }
  //save user updated data
  saveUser() {
    const updatedUser: User = { ...this.selectedUser, ...this.userForm.value };
    this.store.dispatch(updateUser({ user: updatedUser }));
    this.showUserInfo = false;
    // add toaster message here
    this.messageService.add({
      severity: 'success',
      summary: 'User Updated',
      detail: `User with id ${updatedUser.id} has been updated successfully.`,
    });
  }
  // sort users by name
  sortUsersByName() {
    this.users.sort((a, b) => {
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }
      return 0;
    });
  }
  // sort users by id
  sortUsersById() {
    this.users.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
