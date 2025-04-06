import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

export async function init() {
  const db = await SQLite.openDatabaseAsync("weather.db");

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS weatherInf (id INTEGER PRIMARY KEY NOT NULL,
        address TEXT NOT NULL, 
        description TEXT NOT NULL,
        currentConditions TEXT NOT NULL,
        days TEXT NOT NULL);
        `);
}

export async function insertData(
  address,
  description,
  currentConditions,
  days
) {
  const db = await SQLite.openDatabaseAsync("weather.db");
  try {
    const result = await AsyncStorage.getItem("localInsertion");
    if (result == "Y")
      updateDate(address, description, currentConditions, days);
    else {
      await db.runAsync(
        `INSERT INTO weatherInf (address, description,currentConditions,days) VALUES (?, ?, ?, ?)`,
        address,
        description,
        JSON.stringify(currentConditions),
        JSON.stringify(days)
      );
      AsyncStorage.setItem("localInsertion", "Y");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateDate(
  address,
  description,
  currentConditions,
  days
) {
  const db = await SQLite.openDatabaseAsync("weather.db");
  try {
    const response = await db.runAsync(
      "UPDATE weatherInf SET address = ?,description = ?,currentConditions = ?,days = ? WHERE id = ?",
      address,
      description,
      JSON.stringify(currentConditions),
      JSON.stringify(days),
      1
    );
  } catch (error) {
    console.log("UPDATE ERROR", error);
  }
}

export async function getData() {
  try {
    const db = await SQLite.openDatabaseAsync("weather.db");
    const result = await AsyncStorage.getItem("localInsertion");
    if (result !== "Y") return null;
    const allRows = await db.getAllAsync("SELECT * FROM weatherInf");
    return {
      address: allRows[0].address,
      description: allRows[0].description,
      currentConditions: JSON.parse(allRows[0].currentConditions),
      days: JSON.parse(allRows[0].days),
    };
  } catch (error) {
    console.log("get error", error);
  }
}
