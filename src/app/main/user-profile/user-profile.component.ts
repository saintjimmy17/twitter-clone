import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../interface';
import { AuthService } from '../shared/services/auth.service';
import { ModelService } from '../shared/services/model.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  isFollowed: boolean = false;
  followingCount: number = 0;
  followersCount: number = 0;
  user!: User;
  currentUserId: string = '';
  loading: boolean = false;
  isAdmin: boolean = false;

  private subscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public auth: AuthService, public modalService: ModelService){}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.currentUserId = params.get('id') || ''
      this.isAdmin = this.currentUserId === this.auth.loggedInUserId ? true : false
      this.getCurrentUserProfileInfo();
      this.getFollowers();
      this.getFollowing();
      if (this.auth.isLoggedId) {
        this.userService.checkIfFollowed(this.auth.loggedInUserId, this.currentUserId).subscribe((isFollowed) => {
          this.isFollowed = isFollowed
        })
      }
    })
  }

  getCurrentUserProfileInfo(): void {
    this.subscription = this.userService.getAllUsers().subscribe(_user => {
      console.log(_user)
      this.user = _user.find(u => u.uid === this.currentUserId) as User;
    })
  }

  getFollowing(): void {
    this.subscription = this.userService.getFollowingCount(this.currentUserId).subscribe(count => {
      this.followingCount = count;
    })
  }

  getFollowers(): void {
    this.userService.getFollowersCount(this.currentUserId).subscribe(count => {
      this.followersCount = count;
    })
  }

  toggleFollow(): void {
    if(!this.auth.isLoggedId){
      this.modalService.isLoginModelOpen.set(true)
      return;
    }
    if (this.isFollowed) {
      this.userService.unfollowUser(this.auth.loggedInUserId, this.currentUserId).then(res => {
        //
      })
    } else {
      this.userService.followUser(this.auth.loggedInUserId, this.currentUserId).then(res => {
        //
      })
    }
    this.isFollowed = !this.isFollowed;
  }
}



