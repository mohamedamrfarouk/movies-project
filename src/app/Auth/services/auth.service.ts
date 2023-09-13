
export class AuthService {
  private loggedIn = false;

  public isAuthenticated(){
    return this.loggedIn
  }
  public login(){
    this.loggedIn = true
  }
  public logout(){
    this.loggedIn = false
  }
}
