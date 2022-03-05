class Employee {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    describe() {
        return console.log(`${this.name} has ${this.id} `);
    }
}
// creating class company with properties name and department property which will take an array 
class Company {
    constructor(name) {
        this.name = name;
        this.department = [];
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.department.push(employee);
        }
        else {
            throw new Error('You can only add instance of Employee. Argument is not a employee: ${employee}');
        }
    }

    describe() {
        return `${this.name} has ${this.department.length} employees`;
    }
}
// Creating a menu 
class Menu {
    constructor() {
        this.companies = [];
        this.selectedCompany = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createCompany();
                    break;
                case '2':
                    this.viewCompany();
                    break;
                case '3':
                    this.deleteCompany();
                    break;
                case '4':
                    this.displayCompanies();
            }
            selection = this.showMainMenuOptions()
        }
        alert('Bye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create new company
        2) View company
        3) Delete company
        4) Display all companies  
        `);
    }

    showCompanyMenuOptions(companyInfo) {
        return prompt(`
        0) Back
        1) Create Employee
        2) Delete Employee
        --------------------
        ${companyInfo}
        `);
    }

    displayCompanies() {
        let compString = '';
        for (let i = 0; i < this.companies.length; i++) {
            compString += i + ') ' + this.companies[i].name + '\n';
        }
        alert(compString);
    }
    createCompany() {
        let name = prompt('Enter name for a new company');
        this.companies.push(new Company(name));
    }

    viewCompany() {
        let index = prompt('Enter the index of the company you wish to view:');
        if (index > -1 && index < this.companies.length) {
            this.selectedCompany = this.companies[index];
            let description = 'Company Name: ' + this.selectedCompany.name + '\n';

            for (let i = 0; i < this.selectedCompany.department.length; i++) {
                description += i + ') ' + this.selectedCompany.department[i].name
                    + ' - ' + this.selectedCompany.department[i].id + '\n';
            }

            let selection = this.showCompanyMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        }
    }
    deleteCompany() {
        let index = prompt('Enter the index of the company you wish to delete:')
        if (index > -1 && index < this.companies.length) {
            this.companies.splice(index, 1);
        }
    }

    createEmployee() {
        let name = prompt('Enter name for new employee:');
        let id = prompt('Enter badge id for new employee:');
        this.selectedCompany.department.push(new Employee(name, id));
    }

    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:')
        if (index > -1 && index < this.selectedCompany.department.length) {
            this.selectedCompany.department.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
