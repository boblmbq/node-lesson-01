const yargs = require("yargs");
const Manager = require("./contacts");
const ContactsManager = new Manager("contacts.json") // хотів би запитати чи правильно я зробив коли написав ось так

yargs.command({
  command: "list",
  describe: "Shows list of your contacts",
  handler: async () => {
    const contacts = await ContactsManager.listContacts();
    console.log(contacts);
  },
});

yargs.command({
  command: "get",
  describe: "Shows list of your contacts",
  builder: {
    id: {
      describe: "contact's id",
      demandOption: true,
      type: "string",
    },
  },
  handler: async function (argv) {
    const gettedContact = await ContactsManager.getContactById(argv.id);
    console.log(gettedContact);
  },
});

yargs.command({
  command: "add",
  describe: "adds a contact",
  builder: {
    name: {
      demandOption: true,
      type: "string",
    },
    email: {
      demandOption: true,
      type: "string",
    },
    phone: {
      demandOption: true,
      type: "string",
    },
  },
  handler: async ({ name, email, phone }) => {
    const addedContact = await ContactsManager.addContact(name, email, phone);
    console.log(addedContact);
  },
});

yargs.command({
  command: "remove",
  describe: "adds a contact",
  builder: {
    id: {
      demandOption: true,
      type: "string",
    },
  },
  handler: async (argv) => {
    const removedContact = await ContactsManager.removeContact(argv.id);
    console.log(removedContact);
  },
});

yargs.parse();

// я не розібрався нормально з yargs та commander тому написат ось так на yargs