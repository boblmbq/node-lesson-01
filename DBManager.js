// трішки підглянув код у Вадима, бо він пише краще, щоб ви зрозуміли що списую код не бездумно, буду іноді писати пояснювальні коменти
const { write } = require("fs");
const { readFile, writeFile } = require("fs/promises"); // беремо методи readFile, writeFile з об'єкту fs/promises щоб читати та перезаписувати файл
const { join } = require("path"); // беремо метод join для того щоб система сама визначила як писати "дорогу" до файлу спираючись на те яка в мене система

class DatabaseManager {
  constructor() {
    this.databasePath = join(process.cwd(), "db", "contacts.json");
    // пишемо process.cwd() щоб дізнатись поточну папку де виконується код та далі пишемо шлях до бази даних
  }

  async writeToFile(data) {
    try {
      await writeFile(this.databasePath, JSON.stringify(data, null, 2));
      console.log("The operation succesfully done");
    } catch (error) {
      console.log(
        `sorry current operation wasn't done because this error ocurred ${error}`
      );
    }
  }

  fetchContacts = async () => {
    try {
      const binaryContacts = await readFile(this.databasePath);
      return JSON.parse(binaryContacts); // парсимо з бінарних данних на js код
    } catch (error) {
      console.log(error);
    }
  };

  addContact = async (newContact) => {
    const contacts = await this.fetchContacts();
    contacts.push(newContact);
    await this.writeToFile(contacts);
    return newContact;
  };

  removeContact = async (id) => {
    const contacts = this.fetchContacts();
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      console.log("sorry, the user can't be found");
      return null;
    }
    const updatedContacts = contacts.toSpliced(idx, 1); // пишу toSpliced щоб не мутувати масив а зробити копію та швидше "вирізати" елемент
    await this.writeToFile(updatedContacts);
    return contacts[idx];
  };
}

module.exports = DatabaseManager; // ось тут не зрозумів чому експортуємо не екземпляр
