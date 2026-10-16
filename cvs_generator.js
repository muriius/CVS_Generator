/*** 
 *  Name : String - Testname
 *  type : student, working single / family / retired
 *  Age : Number  - rnd, as Test
 *  IBAN : String (DE + numbers)
 *  Income : [] : as Object
 *  multiplier + häufigkeit -> check from income
 *  Transactions [] : as List
*/

//  Constants -----

//Life_types
const life_types = {
    1: "student",
    2: "working_single",
    3: "working_family",
    4: "retired",
};
const fake_names = {
    1: "Max Mustermann",
    2: "Michael Mustermensch",
    3: "Michaela Musterfrau",
    4: "Tobias Mischmann",
    5: "Jonathan Banke",
    6: "Mia Mustermann",
    7: "Anna Musterfrau",
};
const frequency_types = {
    1: "daily", // 4-6 times a week
    2: "often", // 2-3 times a week
    3: "weekly", // 1-2 times a week
};
const multiplier_types = {
    low: 1, 
    normal: 2, 
    high: 3, 
}; 
// Funktionen
function getRandomAge(type) {
    switch (type) {
        case "student":
            return Math.floor(Math.random() * 10) + 18; // 18-27
        case "working_single":
            return Math.floor(Math.random() * 20) + 25; // 25-44
        case "working_family":
            return Math.floor(Math.random() * 20) + 30; // 30-49
        case "retired":
            return Math.floor(Math.random() * 30) + 60; // 60-89
        default:
            return Math.floor(Math.random() * 10) + 18;
    }
}
function generateIBAN(CountryCode) { 
    const countryCode =  CountryCode || "DE"; // Default to Germany if no country code is provided
    const checkDigits = Math.floor(Math.random() * 90 + 10); // Random 2-digit number
    const bankCode = Math.floor(Math.random() * 90000000 + 10000000); // Random 8-digit number
    const accountNumber = Math.floor(Math.random() * 9000000000 + 1000000000); // Random 10-digit number

    return `${countryCode}${checkDigits}${bankCode}${accountNumber}`;
}

//TODO: make it more realistic, based on the IBAN rules, but for now it's just a random number
function generateBIC(iban) { //the real bic after the rules from the iban
    const bankCode = iban.slice(4, 12); // Extract the bank code from the IBAN
    const bic = `BANKDEFF${bankCode}`; // Construct the BIC using the bank code
    return bic;
}

function generateIncome(type) { 
    const jitter = 0.9 + Math.random() * 0.2;
    if (type === "student") {   
    if (Math.random() < 0.63) { 
        return [{ 
            amount : 855,
            name : "BAföG",
        },
        {
            amount : 250,
            name : "Kindergeld",
        },
        {
            amount : 603, 
            name : "Nebenjob",
        }];
    } else {
        return [{ 
            amount : 855,
            name : "BAföG",
        },
        {
            amount : 250,
            name : "Kindergeld",
        }];
    }
}
    if (type === "working_single") {
        return [{
            amount : 2200 * jitter,
            name : "Gehalt",
        }];
    }
    if (type === "working_family") {
        return [{
            amount : 3500 * jitter,
            name : "Gehalt",
        },
        {
            amount : 250,
            name : "Kindergeld",
        }];
    }
    if (type === "retired") {
        return [{
            amount : 1800 * jitter,
            name : "Pension",
        }];
    }
}

function setFrequency(type) { 
    switch (type) {
        case "student":
            return 2;
        case "working_single":
            return 2;
        case "working_family":
            return 3;
        case "retired":
            return 3;
        default:
            return 3;
    }
}

function setMultiplier(income) {
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
    if (totalIncome < 1500) {
        return 1;
    } else if (totalIncome < 3000) {
        return 2;
    } else {
        return 3;
    }
}

function getRent(type) {
     const jitter = 0.9 + Math.random() * 0.2;
    switch (type) {
        case "student":
            return 580*jitter;
        case "working_single":
            return 1100*jitter;
        case "working_family":
            return 1600*jitter;
        case "retired":
            return 800*jitter;
    }
}

function getContracts(type) {
    switch (type) {
        case "student":
            return [
                {"name": "Internet", "amount": 20, iban: generateIBAN()}, 
                {"name": "Phone", "amount": 20, iban: generateIBAN()},
                {"name": "Strom", "amount": 25, iban: generateIBAN()},
                {"name": "Netflix", "amount": 10, iban: generateIBAN()},

            ];

        case "working_single":
            return [
                {"name": "Internet", "amount": 20, iban: generateIBAN()}, 
                {"name": "Phone", "amount": 40, iban: generateIBAN()}, 
                {"name": "Strom", "amount": 25, iban: generateIBAN()},
                {"name": "Gym", "amount": 50, iban: generateIBAN()},
                {"name": "Netflix", "amount": 10, iban: generateIBAN()},
                {"name": "GEZ", "amount": 18.36, iban: generateIBAN()},];


        case "working_family":
            return [
                {"name": "Internet", "amount": 20 , iban: generateIBAN()}, 
                {"name": "Phone", "amount": 40, iban: generateIBAN()},  
                {"name": "Netflix", "amount": 10, iban: generateIBAN()},
                {"name": "Disney", "amount": 10, iban: generateIBAN()},
                {"name": "GEZ", "amount": 18.36, iban: generateIBAN()},];


        case "retired":
            return [
                {"name": "Internet", "amount": 20, iban: generateIBAN()}, 
                {"name": "Phone", "amount": 20, iban: generateIBAN()}, 
                {"name": "MiniGolf", "amount": 15, iban: generateIBAN()},
                {"name": "GEZ", "amount": 18.36, iban: generateIBAN()},];
        default:
            return [];
    }
}
function getGroceries(type) {
    switch (type) {
        case "student":
            return 180;
        case "working_single":
            return 300;
        case "working_family":
            return 650;
        case "retired":
            return 350;
    }
}
function getLeisure(type) {
    switch (type) {
        case "student":
            return 80;
        case "working_single":
            return 200;
        case "working_family":
            return 450;
        case "retired":
            return 180;
    }
}

class person {
    constructor (data = {}){
        this.name       = data.fake_names || fake_names[Math.floor(Math.random() * Object.keys(fake_names).length) + 1]; //check if name is given, else random
        this.type       = data.type       || life_types[Math.floor(Math.random() * Object.keys(life_types).length) + 1]; //check if type is given, else random
        this.age        = data.age        || getRandomAge(this.type); 
        this.IBAN       = data.IBAN       || generateIBAN(""); 
        this.income     = data.income     || generateIncome(this.type); 
        this.frequency  = data.frequency  || setFrequency(this.type); 
        this.multiplier = data.multiplier || setMultiplier(this.income); 
        this.rent       = data.rent       || getRent(this.type); 
        this.contracts  = data.contracts  || getContracts(this.type); 
        this.groceries  = data.groceries  || getGroceries(this.type);
        this.leisure    = data.leisure    || getLeisure(this.type);
        this.transactions = data.transactions || []; 
    } 
} 

class transaction {
    constructor (data = {})
{
        this.wertstellungsdatum = data.wertstellungsdatum;
        this.buchungsdatum = data.buchungsdatum;
        this.betrag = data.betrag;
        this.steuerbetrag = data.steuerbetrag;
        this.waehrung = data.waehrung;
        this.zweck = data.zweck;
        this.gegenstelle = data.gegenstelle;
        this.ibanDerGegenstelle = data.ibanDerGegenstelle;
        this.bicDerGegenstelle = data.bicDerGegenstelle;
        this.blzDerGegenstelle = data.blzDerGegenstelle;
        this.banknameDerGegenstelle = data.banknameDerGegenstelle;
        this.mandatsreferenzDerGegenstelle = data.mandatsreferenzDerGegenstelle;
        this.kundenreferenzDerGegenstelle = data.kundenreferenzDerGegenstelle;
        this.glaeubigerIdDerGegenstelle = data.glaeubigerIdDerGegenstelle;
        this.transaktionstyp = data.transaktionstyp;
        this.zkaCode = data.zkaCode;
        this.swiftNachrichtentyp = data.swiftNachrichtentyp;
        this.kommentar = data.kommentar;
    }
}

const supermarkets = [
    { name: "Aldi", bic: "ALDIDEFFXXX",     iban: generateIBAN() },
    { name: "Lidl", bic: "LIDLDEFFXXX",     iban: generateIBAN() },
    { name: "Edeka", bic: "EDEKDEFFXXX",    iban: generateIBAN() },
    { name: "Rewe", bic: "REWEDEFFXXX",     iban: generateIBAN() },
    { name: "Kaufland", bic: "KAUFLDEFFXXX",iban: generateIBAN() },
    { name: "Penny", bic: "PENNYDEFFXXX", iban: generateIBAN() },
    { name: "Netto", bic: "NETTODEFFXXX", iban: generateIBAN() },
    { name: "Real", bic: "REALDEFFXXX", iban: generateIBAN() },
    { name: "Kaufland", bic: "KAUFLDEFFXXX", iban: generateIBAN() },
];

const places = [
    { name: "Restaurant", bic: "RESTDEFFXXX", iban: generateIBAN(), estimate: 20 },
    { name: "Cafe", bic: "CAFEDEFFXXX", iban: generateIBAN(), estimate: 10 },
    { name: "Bar", bic: "BARDEFFXXX", iban: generateIBAN(), estimate: 15 },
    { name: "Cinema", bic: "CINEMADEFFXXX", iban: generateIBAN(), estimate: 12 },
    { name: "Amazon", bic: "AMAZONDEFFXXX", iban: generateIBAN(), estimate: 30 },
    { name: "Zalando", bic: "ZALANDEFFXXX", iban: generateIBAN(), estimate: 50 },
];

function addTransactions(person) {
    const transactions = [];

    addGroceriesTrans(person, transactions);
    addLeisureTrans(person, transactions);

    // Nach Datum sortieren
    transactions.sort((a, b) => new Date(a.buchungsdatum) - new Date(b.buchungsdatum));

    person.transactions = transactions;
}

function addGroceriesTrans(person, transactions) {
    const weeklyBudget = person.groceries / 4;

    // Anzahl der Einkäufe pro Woche abhängig von der Frequency
    const shoppingFrequency = {
        1: 5,   // daily: 4-6 Einkäufe pro Woche
        2: 2.5, // often: 2-3 Einkäufe pro Woche
        3: 1.5  // weekly: 1-2 Einkäufe pro Woche
    };

    const shoppingCount = shoppingFrequency[person.frequency] || 1.5;
    const averageAmount = weeklyBudget / shoppingCount;

    // Ungefähr 4 Wochen simulieren
    const numberOfTransactions = Math.round(shoppingCount * 4);

    for (let i = 0; i < numberOfTransactions; i++) {
        const supermarket = supermarkets[
            Math.floor(Math.random() * supermarkets.length)
        ];

        // Zufällige Abweichung von -10 % bis +10 %
        const jitter = 0.9 + Math.random() * 0.2;
        const amount = -(averageAmount * jitter);

        // Zufälliges Datum innerhalb der letzten 28 Tage
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 28));

        transactions.push(new transaction({
            wertstellungsdatum: date,
            buchungsdatum: date,
            betrag: Number(amount.toFixed(2)),
            steuerbetrag: 0,
            waehrung: "EUR",
            zweck: "Lebensmitteleinkauf",
            gegenstelle: supermarket.name,
            ibanDerGegenstelle: supermarket.iban,
            bicDerGegenstelle: supermarket.bic,
            blzDerGegenstelle: "",
            banknameDerGegenstelle: "",
            mandatsreferenzDerGegenstelle: "",
            kundenreferenzDerGegenstelle: "",
            glaeubigerIdDerGegenstelle: "",
            transaktionstyp: "Ausgabe",
            zkaCode: "",
            swiftNachrichtentyp: "",
            kommentar: "Groceries"
        }));
    }
}

function addLeisureTrans(person, transactions) {
    const monthlyBudget = Number(person.leisure);
    const multiplier = Number(person.multiplier) || 1;

    let remainingBudget = monthlyBudget;

    // Maximale Anzahl an Versuchen, um Endlosschleifen zu vermeiden
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
        attempts++;

        // Zufälligen Ort auswählen
        const place = places[
            Math.floor(Math.random() * places.length)
        ];

        // Estimate * Multiplier mit ±10 % Jitter
        const jitter = 0.9 + Math.random() * 0.2;
        const amount = Number(
            (place.estimate * multiplier * jitter).toFixed(2)
        );

        // Einkauf überspringen, wenn Budget nicht ausreicht
        if (amount > remainingBudget) {
            continue;
        }

        // Zufälliges Datum innerhalb der letzten 28 Tage
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 28));

        transactions.push(new transaction({
            wertstellungsdatum: date,
            buchungsdatum: date,
            betrag: -amount,
            steuerbetrag: 0,
            waehrung: "EUR",
            zweck: "Freizeitausgabe",
            gegenstelle: place.name,
            ibanDerGegenstelle: place.iban,
            bicDerGegenstelle: place.bic,
            blzDerGegenstelle: "",
            banknameDerGegenstelle: "",
            mandatsreferenzDerGegenstelle: "",
            kundenreferenzDerGegenstelle: "",
            glaeubigerIdDerGegenstelle: "",
            transaktionstyp: "Ausgabe",
            zkaCode: "",
            swiftNachrichtentyp: "",
            kommentar: "Leisure"
        }));

        // Verbleibendes Budget reduzieren
        remainingBudget = Number(
            (remainingBudget - amount).toFixed(2)
        );

        // Abbrechen, wenn kein Ort mehr ins Budget passt
        const cheapestPlace = Math.min(
            ...places.map(p => p.estimate * multiplier * 0.9)
        );

        if (remainingBudget < cheapestPlace) {
            break;
        }
    }
}

function generateBankStatement(person, year, month) {
    const statement = [];

    // month: 1 = Januar, 12 = Dezember
    const daysInMonth = new Date(year, month, 0).getDate();

    // Hilfsfunktion zum Erstellen einer Transaktion
    function createTransaction(date, amount, purpose, recipient, category) {
        return new transaction({
            wertstellungsdatum: date,
            buchungsdatum: date,
            betrag: Number(amount.toFixed(2)),
            steuerbetrag: 0,
            waehrung: "EUR",
            zweck: purpose,
            gegenstelle: recipient,
            ibanDerGegenstelle: "",
            bicDerGegenstelle: "",
            blzDerGegenstelle: "",
            banknameDerGegenstelle: "",
            mandatsreferenzDerGegenstelle: "",
            kundenreferenzDerGegenstelle: "",
            glaeubigerIdDerGegenstelle: "",
            transaktionstyp: amount >= 0 ? "Einzahlung" : "Auszahlung",
            zkaCode: "",
            swiftNachrichtentyp: "",
            kommentar: category
        });
    }

    // ------------------------------------
    // TAG 1: INCOME
    // ------------------------------------

    const incomeDate = new Date(year, month - 1, 1);

    person.income.forEach(income => {
        statement.push(
            createTransaction(
                incomeDate,
                income.amount,
                `Einkommen ${month}/${year}`,
                income.name,
                "Income"
            )
        );
    });

    // ------------------------------------
    // TAG 2: RENT
    // ------------------------------------

    const contractDate = new Date(year, month - 1, 2);

    statement.push(
        createTransaction(
            contractDate,
            -person.rent,
            `Miete ${month}/${year}`,
            "Vermieter",
            "Rent"
        )
    );

    // ------------------------------------
    // TAG 2: CONTRACTS
    // ------------------------------------

    person.contracts.forEach(contract => {
        statement.push(
            createTransaction(
                contractDate,
                -contract.amount,
                `Monatliche Zahlung: ${contract.name}`,
                contract.name,
                "Contract"
            )
        );
    });

    // ------------------------------------
    // TAG 3 - MONATSENDE: GROCERIES + LEISURE
    // ------------------------------------

    person.transactions.forEach(t => {

        // Zufälliger Tag zwischen 3 und Monatsende
        const randomDay = Math.floor(
            Math.random() * (daysInMonth - 2)
        ) + 3;

        const date = new Date(year, month - 1, randomDay);

        // Bestehende Transaktion kopieren
        statement.push(
            new transaction({
                ...t,
                wertstellungsdatum: date,
                buchungsdatum: date,
                transaktionstyp: "Auszahlung"
            })
        );
    });

    // ------------------------------------
    // SORTIERUNG
    // ------------------------------------

    // Neueste Buchungen zuerst (wie im CSV-Beispiel)
    statement.sort(
        (a, b) => b.buchungsdatum - a.buchungsdatum
    );

    return statement;
}

function exportBankStatementCSV(statement) {

    const headers = [
        "Wertstellungsdatum",
        "Buchungsdatum",
        "Betrag",
        "Steuerbetrag",
        "Währung",
        "Zweck",
        "Gegenstelle",
        "IBAN der Gegenstelle",
        "BIC der Gegenstelle",
        "BLZ der Gegenstelle",
        "Bankname der Gegenstelle",
        "Mandatsreferenz der Gegenstelle",
        "Kundenreferenz der Gegenstelle",
        "Gläubiger-ID der Gegenstelle",
        "Transaktionstyp",
        "ZKA-Code",
        "SWIFT-Nachrichtentyp",
        "Kommentar"
    ];

    // Datum in DD.MM.YYYY umwandeln
    function formatDate(date) {
        const d = new Date(date);

        return [
            String(d.getDate()).padStart(2, "0"),
            String(d.getMonth() + 1).padStart(2, "0"),
            d.getFullYear()
        ].join(".");
    }

    // CSV-Felder sicher formatieren
    function escapeCSV(value) {
        const text = String(value ?? "");

        if (/[;"\r\n]/.test(text)) {
            return `"${text.replace(/"/g, '""')}"`;
        }

        return text;
    }

    const rows = statement.map(t => [
        formatDate(t.wertstellungsdatum),
        formatDate(t.buchungsdatum),
        t.betrag.toFixed(2),
        Number(t.steuerbetrag || 0).toFixed(1),
        t.waehrung,
        t.zweck,
        t.gegenstelle,
        t.ibanDerGegenstelle,
        t.bicDerGegenstelle,
        t.blzDerGegenstelle,
        t.banknameDerGegenstelle,
        t.mandatsreferenzDerGegenstelle,
        t.kundenreferenzDerGegenstelle,
        t.glaeubigerIdDerGegenstelle,
        t.transaktionstyp,
        t.zkaCode,
        t.swiftNachrichtentyp,
        t.kommentar
    ].map(escapeCSV).join(";"));

    return [headers.join(";"), ...rows].join("\r\n");
}




// ------------------------------------ TEST SACHEN

/**
Someone = new person(); 
//addTransactions(Someone); 
addTransactions(Someone);
console.log(Someone); 

//add all transactions as a sum and print it
const total = Someone.transactions.reduce((sum, transaction) => sum + transaction.betrag, 0);
console.log(Someone.groceries);
console.log(`Total: ${total}`);
console.log(Someone.transactions.length);


// Groceries
const groceries = Someone.transactions.filter(t => t.kommentar === "Groceries");

console.log("\n--- GROCERIES ---");
groceries.forEach(t => {
    console.log(`${t.gegenstelle}: ${t.betrag.toFixed(2)} €`);
});

const groceriesTotal = groceries.reduce((sum, t) => sum + t.betrag, 0);
console.log(`Gesamt Groceries: ${groceriesTotal.toFixed(2)} €`);
console.log("Erwarteter Wert "+Someone.groceries);


// Leisure
const leisure = Someone.transactions.filter(t => t.kommentar === "Leisure");

console.log("\n--- LEISURE ---");
leisure.forEach(t => {
    console.log(`${t.gegenstelle}: ${t.betrag.toFixed(2)} €`);
});

const leisureTotal = leisure.reduce((sum, t) => sum + t.betrag, 0);
console.log(`Gesamt Leisure: ${leisureTotal.toFixed(2)} €`);
console.log("Erwarteter Wert "+Someone.leisure);



console.log("\n--- ALL TRANSACTIONS ---");

// Gesamteinnahmen
const totalIncome = Someone.income.reduce(
    (sum, item) => sum + item.amount, 0
);

// Miete
const totalRent = Someone.rent;

// Verträge (Internet, Strom, Netflix usw.)
const totalContracts = Someone.contracts.reduce(
    (sum, contract) => sum + contract.amount, 0
);

// Alle Transaktionen (Groceries + Leisure)
const totalTransactions = Someone.transactions.reduce(
    (sum, t) => sum + t.betrag, 0
);

// Verbleibendes Geld
const remainingMoney = totalIncome - totalRent - totalContracts + totalTransactions;


// Ausgabe
console.log("\n========== MONATSÜBERSICHT ==========");
console.log(`Person:          ${Someone.name}`);
console.log(`Typ:             ${Someone.type}`);
console.log("-------------------------------------");
console.log(`Einnahmen:       +${totalIncome.toFixed(2)} €`);
console.log(`Miete:           -${totalRent.toFixed(2)} €`);
console.log(`Verträge:        -${totalContracts.toFixed(2)} €`);
console.log(`Transaktionen:    ${totalTransactions.toFixed(2)} €`);
console.log("-------------------------------------");
console.log(`RESTGELD:         ${remainingMoney.toFixed(2)} €`);
console.log("=====================================");


//---CSV Test
/** 

// Person erstellen
const Someone = new person();

// Groceries und Leisure generieren
addTransactions(Someone);

// Kontoauszug für Oktober 2026 erstellen
const statement = generateBankStatement(Someone, 2026, 10);

// CSV generieren
const csv = exportBankStatementCSV(statement);

// Ausgabe
console.log(csv);

const fs = require("fs");

fs.writeFileSync(
    "kontoauszug.csv",
    "\uFEFF" + csv,
    "utf8"
);

const total = statement.reduce(
    (sum, t) => sum + t.betrag,
    0
);

console.log("\n========== KONTOAUSZUG ==========");
console.log(`Person: ${Someone.name}`);
console.log(`Monat: 10/2026`);
console.log(`Transaktionen: ${statement.length}`);
console.log("---------------------------------");
console.log(`Monatlicher Saldo: ${total.toFixed(2)} €`);
console.log("=================================");

*/
// ------------------------------------ 10 Personen ausgeben als .csv

const fs = require("fs");

const persons = [];
const allTransactions = [];

const year = 2026;
const month = 10;

// 10 Personen erstellen
for (let i = 0; i < 10; i++) {

    const p = new person();

    // Groceries und Leisure generieren
    addTransactions(p);

    // Kontoauszug erstellen
    const statement = generateBankStatement(p, year, month);

    // Person speichern
    persons.push(p);

    // Alle Transaktionen mit Personenzuordnung speichern
    statement.forEach(t => {
        allTransactions.push({
            ...t,
            personId: i + 1,
            personName: p.name,
            personType: p.type
        });
    });
}

// CSV erstellen
const csv = exportBankStatementCSV(allTransactions);

// Datei speichern
fs.writeFileSync(
    "kontoauszuege_10_personen.csv",
    "\uFEFF" + csv,
    "utf8"
);

console.log("10 Personen erfolgreich generiert!");
console.log(`Gesamte Transaktionen: ${allTransactions.length}`);

// Skript ausführbar mit node cvs_generator.js -> liefert .csv mit 10 Personen und deren Transaktionen