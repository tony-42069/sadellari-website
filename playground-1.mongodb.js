// Switch to or create the database
const db = db.getSiblingDB('sadellari_db');

// Create the collection if it doesn't exist
if (!db.getCollectionNames().includes('email_waitlist')) {
  db.createCollection('email_waitlist');
  console.log('Created email_waitlist collection');
} else {
  console.log('email_waitlist collection already exists');
}

// Verify the collection exists
const collections = db.getCollectionNames();
console.log('Collections in sadellari_db:', collections);

// Print the collections for display in results
collections;
