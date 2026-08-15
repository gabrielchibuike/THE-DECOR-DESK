// Updates the Supabase categories table to match the new room structure:
// Bathroom, Bedroom, Living Room, Kitchen, Laundry, Apartment

const SUPABASE_URL = 'https://jrjivysbthvxobrenhpa.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyaml2eXNidGh2eG9icmVuaHBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTY3ODMzMCwiZXhwIjoyMTAxMjU0MzMwfQ.w_Jay-C3xWu0cA2ul2WJh4X3S13TaWOZOT0WEfiTPyw';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Prefer': 'return=representation',
};

async function req(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  return { status: res.status, body: text };
}

async function run() {
  // 1. Get existing categories
  const r = await req('GET', '/categories?select=id,name,slug&order=name');
  const existing = JSON.parse(r.body);
  console.log('Existing categories:', existing.map(c => `${c.name} (${c.slug})`).join(', '));

  // 2. Rename existing categories to match the new naming convention
  const renames = [
    { slug: 'bathroom-ideas',            newName: 'Bathroom' },
    { slug: 'bedroom-ideas',             newName: 'Bedroom' },
    { slug: 'living-room-ideas',         newName: 'Living Room' },
    { slug: 'laundry-room-ideas',        newName: 'Laundry' },
    { slug: 'apartment-living-room-ideas', newName: 'Apartment' },
  ];

  for (const rename of renames) {
    const cat = existing.find(c => c.slug === rename.slug);
    if (cat) {
      const res = await req('PATCH', `/categories?id=eq.${cat.id}`, { name: rename.newName });
      console.log(`✓ Renamed "${cat.name}" → "${rename.newName}" [${res.status}]`);
    } else {
      console.log(`⚠ Not found: ${rename.slug}`);
    }
  }

  // 3. Remove the duplicate apartment-bathroom-ideas or rename to something useful
  const apBath = existing.find(c => c.slug === 'apartment-bathroom-ideas');
  if (apBath) {
    const res = await req('PATCH', `/categories?id=eq.${apBath.id}`, { name: 'Apartment Bathroom' });
    console.log(`✓ Renamed "Apartment Bathroom Ideas" → "Apartment Bathroom" [${res.status}]`);
  }

  // 4. Insert Kitchen if it doesn't exist
  const kitchenExists = existing.find(c => c.slug === 'kitchen-ideas');
  if (!kitchenExists) {
    const res = await req('POST', '/categories', {
      name: 'Kitchen',
      slug: 'kitchen-ideas',
      description: 'Elevate your kitchen with warm tones, beautiful hardware, and functional styling.',
      image_url: null,
    });
    console.log(`✓ Created Kitchen category [${res.status}]`);
    if (res.status !== 201) console.log('  Body:', res.body.substring(0, 300));
  } else {
    // Rename to just "Kitchen"
    const res = await req('PATCH', `/categories?id=eq.${kitchenExists.id}`, { name: 'Kitchen' });
    console.log(`✓ Renamed kitchen to "Kitchen" [${res.status}]`);
  }

  // 5. Verify final state
  const r2 = await req('GET', '/categories?select=name,slug&order=name');
  const final = JSON.parse(r2.body);
  console.log('\nFinal categories:');
  final.forEach(c => console.log(`  ${c.name} → /blog/${c.slug}`));
}

run().catch(console.error);
