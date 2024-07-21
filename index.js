const { log } = require("console");

class Transaction {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }
}

class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transaction = [];
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getTransactions() {
    return this.transaction;
  }
  getBalance() {
    let balance = 0;
    this.transaction.forEach((tr) => {
      balance = balance + tr.amount;
    });
    if (balance < 0) {
      console.log("the balance cannot be negative:");
      return 0;
    } else {
      console.log("the balance is:");
      return balance;
    }
  }
  addTransactions(amount) {
    if (amount > 0) {
      const trn1 = new Transaction(amount, new Date().toISOString());
      this.transaction.push(trn1);
      return "transaction added";
    } else if (amount < 0) {
      const trn1 = new Transaction(amount, new Date().toISOString());
      this.transaction.push(trn1);
      return "transaction added";
    }
    if (amount > this.getBalance()) {
      return "No sufficient balance";
    }
  }
}

class Branch {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }
  getName() {
    return this.name;
  }
  getCustomers() {
    // return JSON.stringify(this.customers, null, 2);
    return this.customers;
  }
  addcustomer(customer) {
    if (this.customers.find((cc) => cc === customer)) {
      return console.log("this customer is already added");
    }
    this.customers.push(customer);
  }

  addCustomerTransaction(customerId, amount) {
    const findCustomer = this.customers.find((customer) => {
      return customer.getId() === customerId;
    });
    if (findCustomer) {
      return findCustomer.addTransactions(amount);
    }
  }

  findBranchByName(customerName) {
    const findCustomer = this.customers.find((customer) => {
      return customer.getName() === customerName;
    });
    return findCustomer;
  }
}

class Bank {
  constructor(name) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch) {
    if (this.branches.find((bb) => bb === branch)) {
      return console.log("this branch is already added");
    }
    this.branches.push(branch);
  }

  addCustomer(branch, customer) {
    const findcustomer = branch.getCustomers().find((cc) => {
      return cc.getId() === customer.id;
    });
    if (!findcustomer) {
      branch.addcustomer(customer);
    } else {
      return console.log("this customer as already added");
    }
  }
  addCustomerTransaction(branch, customerId, amount) {
    branch.addCustomerTransaction(customerId, amount);
  }

  findBranchByName(branchName) {
    const findBranchBynum = this.branches.find((bb) => {
      return bb.getName() === branchName;
    });
    if (findBranchBynum) {
      return console.log("this Branch it is in bank " + findBranchBynum);
    }
    return console.log("this Branch it is not in bank");
  }

  findCustomerByName(branchName, customerName) {
    return branchName.findBranchByName(customerName);
  }

  checkBranch(branch) {
    const belongBranch = this.branches.find((bb) => {
      return bb === branch;
    });
    if (belongBranch) {
      return true;
    } else {
      return false;
    }
  }

  listCustomers(branch, includeTransactions) {
    if (includeTransactions === true) return branch;
    else if (includeTransactions === false) {
      const justNames = branch.getCustomers().map((names) => {
        return names.getName();
      });
      return justNames;
    }
  }
}

// const riyad = new Bank("Riyad Bank");
// const alsawadi = new Branch("Alsawadi");
// const oliah = new Branch("Oliah");
// const oliah2 = new Branch("Oliah");
// const customer1 = new Customer("mohammad", 1);
// const customer2 = new Customer("alhusin", 2);

// riyad.addBranch(alsawadi);
// riyad.addBranch(oliah);
// // riyad.addCustomer(alsawadi, customer1);
// alsawadi.addcustomer(customer1);
// alsawadi.addcustomer(customer1);
// // alsawadi.addcustomer(customer2);

// const customer3 = new Customer("Fakhrdeen", 3);
// const customer4 = new Customer("Abbas", 4);

// alsawadi.addcustomer(customer3);
// alsawadi.addcustomer(customer4);
// riyad.addCustomerTransaction(alsawadi, 1, 300);
// riyad.addCustomerTransaction(alsawadi, 1, -100);
// // console.log(riyad);
// console.log(alsawadi);
// // console.log(alsawadi.getCustomers());

// // console.log(riyad.checkBranch(alsawadi));
// // console.log(customer1.getTransactions());
// // console.log(riyad.listCustomers(alsawadi, true));

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
// arizonaBank.addBranch(westBranch);

// arizonaBank.findBranchByName("bank");
// arizonaBank.findBranchByName("sun");

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

// customer1.addTransactions(-1000);
// console.log(customer1.getBalance());
// console.log(arizonaBank.listCustomers(westBranch, true));
// console.log(arizonaBank.listCustomers(sunBranch, true));
console.log(arizonaBank.findCustomerByName(sunBranch, "Anna"));
