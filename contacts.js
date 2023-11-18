const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

class Contacts {
  constructor(filePath) {
    this.filePath = filePath;
  }
  listContacts = async () => {
    const data = await fs.readFile(this.filePath);
    return JSON.parse(data);
  };

  getContactById = async (contactId) => {
    const contacts = await this.listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      console.log("sorry we didn't found the user");
      return null;
    }
    return contacts[idx];
  };

  removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    
  }

  addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
  }
}

const contacts = new Contacts(contactsPath);

contacts.getContactById("qdggE76Jtbfd9eWJHrssH");
