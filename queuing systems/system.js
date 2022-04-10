const generator = (time, clients, scanTimeRule, seachBookTimeRule) => {
  while (true) {
    const nextClientEnter = Math.floor(Math.random() * 6) + 2; // from 2 to 8 min
    time -= nextClientEnter;

    if (time < 0) break;

    const bookID = Math.floor(Math.random() * 5000);
    const readerID = Math.floor(Math.random() * 15000);
    const timeScan = scanTimeRule(readerID);
    const timeSearchBook = seachBookTimeRule(bookID);

    const client = {
      enterSystemAt: time,
      timeInQueue: 0,
      timeInService: timeScan + timeSearchBook,
      releaseSystemAt: 0,
      readerID: readerID,
      bookID: bookID,
      timeScan: timeScan,
      timeSearchBook: timeSearchBook,
      needTime: timeScan + timeSearchBook,
    };

    clients.push(client);
  }
};

const scanRidBook = (Rid) => {
  return (Math.floor(Math.log(Rid)) + 20) / 60;
};

const scanRidComputer = (Rid) => {
  return (Math.floor(Math.random() * 3) + 2) / 60;
};

const seachBookWithoutBase = (bookID) => {
  return Math.floor(bookID / 500) + 1;
};

const seachBookWithBase = (bookID) => {
  return (Math.floor(Math.random() * 30) + 50) / 60;
};

const queueServiceWorker = (time, clients) => {
  const localQueue = [];

  const statistics = {
    freeTime: 0,
    serviced: 0,
    unserviced: clients.length,
    clientInQueue: 0,
    timeInQueue: 0,
    callInMin: 0,
    serviceInMin: 0,
    middleClientInSystem: 0,
    middleWaitTimeInSystem: 0,
    recycle: 0,
    downtimeProbability: 0,
  };

  statistics.callInMin = clients.length / time;

  let currentClient = null;
  let nextClient = null;

  for (let i = 0; i < time; i++) {
    if (clients.length > 0 && clients[clients.length - 1].enterSystemAt == i) {
      localQueue.push(clients.pop());
    }

    if (!nextClient && localQueue.length > 0) {
      nextClient = localQueue.shift();
    }

    if (!currentClient && nextClient) {
      currentClient = nextClient;
      nextClient = null;

      if (localQueue.length > 0) {
        nextClient = localQueue.shift();
      }
    }

    // console.log("CURRENT:");
    // console.log(currentClient);
    // console.log("NEXT:");
    // console.log(nextClient);

    if (currentClient) {
      if (currentClient.needTime <= 1) {
        const freeTime = 1 - currentClient.needTime;

        statistics.serviced++;
        statistics.timeInQueue += currentClient.timeInQueue;

        // currentClient.releaseSystemAt = i;
        currentClient = nextClient;
        nextClient = null;

        if (currentClient) {
          currentClient.needTime -= freeTime;
        } else {
          statistics.freeTime++;
        }
      } else {
        currentClient.needTime--;
      }

      localQueue.forEach((client) => {
        client.timeInQueue++;
        statistics.clientInQueue += 1 / time;
      });
    } else {
      statistics.freeTime++;
    }
  }

  statistics.unserviced -= statistics.serviced;

  statistics.serviceInMin = statistics.serviced / (time - statistics.freeTime);

  statistics.middleClientInSystem =
    statistics.callInMin / (statistics.serviceInMin - statistics.callInMin);

  statistics.middleWaitTimeInSystem =
    1 / (statistics.serviceInMin - statistics.callInMin);

  statistics.timeInQueue =
    Math.pow(statistics.callInMin, 2) /
    (statistics.serviceInMin *
      (statistics.serviceInMin - statistics.callInMin));

  statistics.clientInQueue =
    statistics.callInMin /
    (statistics.serviceInMin *
      (statistics.serviceInMin - statistics.callInMin));

  statistics.recycle = statistics.callInMin / statistics.serviceInMin;

  statistics.downtimeProbability = 1 - statistics.recycle;

  return statistics;
};

// let clients = []; // clients
// const time = 1440; // minutes

// generator(time, clients, scanRidBook, seachBookWithBase);

// console.log(clients);

// const clientInSystem1 = [...clients];
// const clientInSystem2 = [...clients];

const clientInSystem1 = []; // clients
const clientInSystem2 = []; // clients
const time = 1440; // minutes

generator(time, clientInSystem1, scanRidBook, seachBookWithBase);
generator(time, clientInSystem2, scanRidBook, seachBookWithoutBase);

const statSystem1 = queueServiceWorker(time, clientInSystem1);
const statSystem2 = queueServiceWorker(time, clientInSystem2);

console.log(statSystem1);
console.log(statSystem2);
