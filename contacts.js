const { nanoid } = require("nanoid");
require("nanoid");

const DatabaseManager = require("./DBManager");

class ContactsManager {
  constructor(filename) {
    this.DBManager = new DatabaseManager(filename);
  }

  listContacts = async () => {
    const data = await this.DBManager.fetchContacts();
    return data;
  };

  getContactById = async (contactId) => {
    const contacts = await this.listContacts();
    return contacts.find((contact) => contact.id === contactId) ?? null; //шукаємо користувача по айді та повертаємо його, якщо прийшло undefined то повертаємо null
  };

  removeContact = async (contactId) => {
    const contact = await this.DBManager.removeContact(contactId);
    return contact;
  };

  addContact = async (name, email, phone) => {
    const newContact = { id: nanoid(21), name, email, phone };
    const addedUser = await this.DBManager.addContact(newContact);
    return addedUser;
  };
}


module.exports = ContactsManager; 
