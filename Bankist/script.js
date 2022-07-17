'use strict';

// BANKIST APP
////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-07-05T14:11:59.604Z',
    '2022-07-06T17:01:17.194Z',
    '2022-07-07T23:36:17.929Z',
    '2022-07-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// sort movements
const sortMovements = function (movs, dates) {
  const arrCombined = [], sortedMovs = [], sortedDates = [];

  movs.forEach((el, i) => arrCombined.push([movs[i], dates[i]]));
  arrCombined.sort((a, b) => a[0] - b[0]);
  arrCombined.forEach(el => {
     sortedMovs.push(el[0]);
     sortedDates.push(el[1]);
  });

  return [sortedMovs, sortedDates];
};

// functions

//date
const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed)

  if (daysPassed === 0 ) return 'Today';
  if (daysPassed === 1 ) return 'Yesterday';
  if (daysPassed <= 7 ) return `${daysPassed} days ago`;
  else {

  return new Intl.DateTimeFormat(locale).format(date)
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}` 
  };
}
//currencies
const formattedCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency', 
    currency: currency
  }).format(value);
};


// DISPLAYING MOVEMENTS
const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';
  // .textContent = 0;

  const [movs, dates] = sort
  ? sortMovements(acc.movements, acc.movementsDates)
  : [acc.movements, acc.movementsDates];

  movs.forEach((mov, i) => {

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);


    // const displayDate = formatDate(new Date(dates[i]));

// int numbers
const formattedMov = formattedCur(mov, acc.locale, acc.currency)

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html)

  });
};
// sorting


// console.log(containerMovements.innerHTML);
/////////////////////////////////////////////////////
//////////////////////// Reduce => Calculating balance

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formattedCur(acc.balance, acc.locale, acc.currency);

};


/////////////////////////////////////////////////////
////////////////////////////////// Display Summary

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formattedCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formattedCur(out, acc.locale, acc.currency);

  const interest = acc.movements  
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate/ 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = formattedCur(interest, acc.locale, acc.currency)
};
 

/////////////////////////////////////////////////////
//////////////////////////////////////////// USERNAMES
// map split and toLowerCase return strings
const user = 'Steven Thomas Williams'; //stw

const createUsernames = function (accs) {

  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  })

};
createUsernames(accounts);
console.log(accounts);

////////////////////////////////////////////////////////
/////// Event Handler for login
const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc);

  // Display Calc Balance
  calcDisplayBalance(acc);

  // Display summary 
  calcDisplaySummary(acc);
}

// Set Login Timer
const startLogOutTimer = function() {

 const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    //  in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //  when time is at 0, stop timer and logout user
    if (time === 0 ) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1 second
    time--;
  };

  // Set time to 5 minutes
  let time = 300;
  //  Call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

//////////////////////////////////// EVENT HANDLERS
let currentAccount, timer;


// experimenting with the api
const now = new Date();
const options = {
  hour: 'numeric', 
  minute: 'numeric', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric',
  weekday: 'long'
}

const locale = navigator.language; // getting information off of the browser

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

//////////////////////////////////////////////// LOGGED IN

btnLogin.addEventListener('click', (e) => {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(currentAccount)

  if (currentAccount?.pin === +(inputLoginPin.value)){
    // Display UI and Welcome Msg
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // create current date and time
// experimenting with the api
const now = new Date();
const options = {
  hour: 'numeric', 
  minute: 'numeric', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric',
  weekday: 'long'
}

// const locale = navigator.language; // getting information off of the browser

labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

// calling timer

  if(timer) clearInterval(timer)

  timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount)
    console.log('login')
  }
});

////////////////////// Transfer //////////////////////
// input transfer to, amount 
btnTransfer.addEventListener('click', function (e) {
  // preventing form from forming
  e.preventDefault();

  const amount = +(inputTransferAmount.value) // + replaces Number()

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

  // Update UI
  updateUI(currentAccount)

  // reset timer
  clearInterval(timer)
    timer = startLogOutTimer();
  
  }

})

/////////////////// Loan Feature
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); // rounds down

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function(){currentAccount.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount)
  // reset timer
    clearInterval(timer)
    timer = startLogOutTimer();
  
  }, 4000)

    // Clear input field
    inputLoanAmount.value = '';
    
  }


});


/////////////////// Close ACC
btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && +(inputClosePin.value) === currentAccount.pin) {
    // need to splice
    const index = accounts.findIndex(acc => acc.username === currentAccount.username); 
    // console.log(index)
    
    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  } 

  inputCloseUsername.value = inputClosePin.value = '';
  
});

// SORTING
let sorted = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


labelBalance.addEventListener('click', (e) => {
  e.preventDefault();
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')))
  
  console.log(movementsUI);
});

labelBalance.addEventListener('click', function(e) {
  e.preventDefault;
  [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
    // 0, 2, 4, 6, 8
      if (i % 2 === 0) row.style.backgroundColor = 'orangered'
      // 0, 3, 6, 9, 12
      if ( i % 3 === 0) row.style.backgroundColor = 'blue'
  });

})