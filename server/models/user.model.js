import moment from 'moment';
import uuid from 'uuid';

class User {
  constructor() {
    this.users = [];
  }

  userSignup(data) {
    const newUser = {
      id: this.users.length + 1,
      email: data.email,
      firstName: data.firstname,
      lastName: data.lastname,
      password: data.password
    };
    this.users.push(newUser);
    return newUser;
  }

  userLogin(data) {
    const existingUser = {
      id: this.users.length + 1,
      email: data.email,
      password: data.password
    };
    this.users.push(newUser);
    return existingUser;
  }
}

export default new User();
