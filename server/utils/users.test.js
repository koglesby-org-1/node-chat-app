const expect = require('expect');

const { Users } = require('./users');

describe('Users', function () {
  var users;
  beforeEach(function () {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'dave',
        room: 'Node Devs'
      },
      {
        id: '2',
        name: 'bob',
        room: 'React Devs'
      },
      {
        id: '3',
        name: 'Len',
        room: 'Node Devs'
      }
    ];
  });

  it('should add new user', function () {
    users = new Users();
    const user = {
      id: '123',
      name: 'Kev',
      room: 'Doogles'
    };
    users.addUser(user.id, user.name, user.room);

    expect(users.users).toMatchObject([user]);
  });

  it('should return names for Node Devs', function () {
    const userList = users.getUserList('Node Devs');

    expect(userList).toMatchObject(['dave', 'Len']);
  });

  it('should return names for React Devs', function () {
    const userList = users.getUserList('React Devs');

    expect(userList).toMatchObject(['bob']);
  });

  it('should remove a user', function () {
    const userId = '3';
    const removed = users.removeUser(userId);
    const user = users.getUser(userId);
    expect(users.users.length).toBe(2);
    expect(user).toBeFalsy();
    expect(removed.id).toBe(userId);
  });

  it('should not remove user', function () {
    const userId = '9999999999';
    const removed = users.removeUser(userId);
    const user = users.getUser(userId);
    expect(users.users.length).toBe(3);
    expect(user).toBeFalsy();
    expect(removed).toBeFalsy();
  });

  it('should find user', function () {
    const userId = '1';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user', function () {
    const userId = '9999999999';
    const user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
});
