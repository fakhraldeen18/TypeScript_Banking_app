class Transaction {
  amount: number;
  date: string;
  constructor(amount: number, date: string) {
    this.amount = amount;
    this.date = date;
  }
}

class Customer {
  name: string;
  id: number;
  transaction: Transaction[];
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transaction = [];
  }

  getName(): string {
    return this.name;
  }
  getId(): number {
    return this.id;
  }
  getTransactions(): Transaction[] {
    return this.transaction;
  }
  getBalance(): number {
    let balance = 0;
    this.transaction.forEach((tr) => {
      balance = balance + tr.amount;
    });
    if (balance < 0) {
      console.log("the balance cannot be negative ");
      return 0;
    } else {
      console.log("the balance is ");
      return balance;
    }
  }
  addTransactions(amount: number) {
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
  name: string;
  customers: Customer[];
  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }
  getName(): string {
    return this.name;
  }
  getCustomers(): Customer[] {
    // return JSON.stringify(this.customers, null, 2);
    return this.customers;
  }
  addcustomer(customer: Customer) {
    if (this.customers.find((cc) => cc === customer)) {
      return console.log("this customer is already added");
    }
    this.customers.push(customer);
  }

  addCustomerTransaction(customerId: number, amount: number) {
    const findCustomer = this.customers.find((customer) => {
      return customer.getId() === customerId;
    });
    if (findCustomer) {
      return findCustomer.addTransactions(amount);
    }
  }
}

class Bank {
  name: string;
  branches: Branch[];
  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch: Branch) {
    if (this.branches.find((bb) => bb === branch)) {
      return console.log("this branch is already added");
    }
    this.branches.push(branch);
  }

  addCustomer(branch: Branch, customer: Customer) {
    const findcustomer = branch.getCustomers().find((cc) => {
      return cc.getId() === customer.id;
    });
    if (!findcustomer) {
      branch.addcustomer(customer);
    } else {
      return console.log("this customer as already added");
    }
  }
  addCustomerTransaction(branch: Branch, customerId: number, amount: number) {
    branch.addCustomerTransaction(customerId, amount);
  }

  findBranchByName(branchName: string) {
    const findBranchBynum = this.branches.find((bb) => {
      return bb.getName() === branchName;
    });
    if (findBranchBynum) {
      return console.log("this Branch it is in bank " + findBranchBynum);
    }
    return console.log("this Branch it is not in bank");
  }

  checkBranch(branch: Branch) {
    const belongBranch = this.branches.find((bb) => {
      return bb === branch;
    });
    if (belongBranch) {
      return true;
    } else {
      return false;
    }
  }

  listCustomers(branch: Branch, includeTransactions: boolean) {
    if (includeTransactions === true) return branch;
    else if (includeTransactions === false) {
      const justNames = branch.getCustomers().map((names) => {
        return names.getName();
      });
      return justNames;
    }
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransactions(-1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));