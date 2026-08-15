require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const rooms = [
  { name: 'Bathroom', slug: 'bathroom', description: 'Inspiring bathroom decor and layouts.' },
  { name: 'Bedroom', slug: 'bedroom', description: 'Cozy and beautiful bedroom inspiration.' },
  { name: 'Living Room', slug: 'living-room', description: 'Styling tips for your living spaces.' },
  { name: 'Kitchen', slug: 'kitchen', description: 'Kitchen organization and decor ideas.' },
  { name: 'Laundry', slug: 'laundry', description: 'Practical and beautiful laundry rooms.' },
  { name: 'Apartment', slug: 'apartment', description: 'Decor ideas for small spaces and apartments.' }
];

async function seed() {
  for (const room of rooms) {
    const { error } = await supabase
      .from('categories')
      .upsert({
         id: crypto.randomUUID(),
         name: room.name,
         slug: room.slug,
         description: room.description,
         // image_url left null or we could map them, the user mentioned kitchen.jpg was invalid.
         // type: 'room' // If type column doesn't exist, this will crash! We'll just insert name, slug, description.
      }, { onConflict: 'slug', ignoreDuplicates: false });
      
    if (error) {
       console.log("Error inserting", room.name, error.message);
       // if error contains 'type', try inserting without 'type'
       if (error.message.includes("type")) {
          await supabase.from('categories').upsert({
            id: crypto.randomUUID(),
            name: room.name,
            slug: room.slug,
            description: room.description
          }, { onConflict: 'slug', ignoreDuplicates: false });
       }
    } else {
       console.log("Inserted", room.name);
    }
  }
}

seed();
