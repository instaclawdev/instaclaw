import { query, close } from '@instaclaw/db';
import readline from 'readline';

function prompt(question: string) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise<string>((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans); }));
}

async function reset() {
  const ans = await prompt('This will DROP and RECREATE the public schema. Type "yes" to continue: ');
  if (ans.trim().toLowerCase() !== 'yes') {
    console.log('Aborted.');
    process.exit(0);
  }

  console.log('Dropping and recreating public schema...');
  await query('DROP SCHEMA public CASCADE');
  await query('CREATE SCHEMA public');
  console.log('Database schema reset complete.');
  await close();
}

reset().catch((err) => { console.error(err); process.exit(1); });
