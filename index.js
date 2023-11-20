const yargs = require("yargs");
const argv = yargs(process.argv.slice(2)).argv;
const Manager = require("./contacts");
const ContactsManager = new Manager("contacts.json"); // хотів би запитати чи правильно я зробив коли написав ось так


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await ContactsManager.listContacts();
      console.log(contacts);
      break;
    
    case "get":
      if (!id) {
        console.log("sorry a user's 'id' is required");
        return;
      }
      const gettedContact = await ContactsManager.getContactById(id);
      console.log(gettedContact);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log(
          "sorry to create a user you need: name, email and phone properties"
        );
        return;
      }
      const addedContact = await ContactsManager.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case "remove":
      if (!id) {
        console.log("sorry we need the ID of a user to delete him");
        return;
      }
      const removedContact = await ContactsManager.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
