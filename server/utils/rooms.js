class Rooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(name) {
    this.rooms.push({ name, userCount: 1 });
    // this.incrementUserCount(name);
  }

  removeRoom(name) {
    this.rooms = this.rooms.filter(room => room.name != name);
  }

  getRooms() {
    return this.rooms;
  }

  incrementUserCount(name) {
    const roomIndex = this.rooms.findIndex(room => room.name === name);
    this.rooms[roomIndex].userCount += 1;
  }

  decrementUserCount(name) {
    const roomIndex = this.rooms.findIndex(room => room.name === name);
    const userCount = this.rooms[roomIndex].userCount;
    if (userCount === 1) {
      this.removeRoom(name);
    } else {
      this.rooms[roomIndex].userCount -= 1;
    }
  }
}

module.exports = { Rooms };
