export class UserModel {

  constructor(name, lastname) {
    this.name = name;
    this.lastname = lastname;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}