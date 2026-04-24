import { PrismaClient, Role, Status, SpellType } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Spells ────────────────────────────────────────────────────────────────
  // Upsert every unique spell so we can reference them by name below.

  const spellData: { name: string; type: SpellType }[] = [
    { name: 'Expelliarmus', type: SpellType.CHARM },
    { name: 'Expecto Patronum', type: SpellType.DEFENSIVE },
    { name: 'Stupefy', type: SpellType.CHARM },
    { name: 'Accio', type: SpellType.CHARM },
    { name: 'Alohomora', type: SpellType.UTILITY },
    { name: 'Obliviate', type: SpellType.MEMORY },
    { name: 'Wingardium Leviosa', type: SpellType.CHARM },
    { name: 'Reparo', type: SpellType.UTILITY },
    { name: 'Lumos', type: SpellType.UTILITY },
    { name: 'Crucio', type: SpellType.UNFORGIVABLE },
    { name: 'Patronus', type: SpellType.DEFENSIVE },
    { name: 'Herbivicus', type: SpellType.UTILITY },
    { name: 'Bat Bogey Hex', type: SpellType.HEX },
    { name: 'Reducto', type: SpellType.CHARM },
    { name: 'Lumos Maxima', type: SpellType.UTILITY },
    { name: 'Avada Kedavra', type: SpellType.UNFORGIVABLE },
    { name: 'Fiendfyre', type: SpellType.DARK },
    { name: 'Sectumsempra', type: SpellType.DARK },
    { name: 'Legilimens', type: SpellType.MIND },
    { name: 'Transfiguration', type: SpellType.TRANSFIGURATION },
    { name: 'Piertotum Locomotor', type: SpellType.CHARM },
    { name: 'Riddikulus', type: SpellType.CHARM },
    { name: 'Incarcerous', type: SpellType.BINDING },
    { name: 'Bombarda', type: SpellType.CHARM },
    { name: 'Immobulus', type: SpellType.CHARM },
    { name: 'Conjunctivitis Curse', type: SpellType.CURSE },
    { name: 'Protego', type: SpellType.DEFENSIVE },
    { name: 'Imperio', type: SpellType.UNFORGIVABLE },
    { name: 'Fidelius Charm', type: SpellType.CHARM },
  ];

  const spells: Record<string, { id: number }> = {};

  for (const spell of spellData) {
    const record = await prisma.spell.upsert({
      where: { name: spell.name },
      update: {},
      create: spell,
    });
    spells[spell.name] = record;
    console.log(`  ✔ Spell: ${record.name}`);
  }

  // ── Users ───────────────────────────────────────────────────────────────

  const Users = [
    {
      id: 1,
      name: 'Harry Potter',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Holly, Phoenix Feather',
      spells: [ "Expelliarmus", "Expecto Patronum", "Stupefy", "Accio"],
    },
    {
      id: 2,
      name: 'Hermione Granger',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Vine, Dragon Heartstring',
      spells: [ "Alohomora", "Obliviate", "Wingardium Leviosa", "Reparo", "Lumos"],
    },
    {
      id: 3,
      name: 'Draco Malfoy',
      house: 'Slytherin',
      role: Role.STUDENT,
      status: Status.ON_PROBATION,
      wand: 'Hawthorn, Unicorn Hair',
      spells: ['Expelliarmus', 'Crucio'],
    },
    {
      id: 4,
      name: 'Ron Weasley',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Willow, Unicorn Hair',
      spells: ['Wingardium Leviosa', 'Stupefy', 'Accio'],
    },
    {
      id: 5,
      name: 'Luna Lovegood',
      house: 'Ravenclaw',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Thestral Tail Hair',
      spells: ['Stupefy', 'Expelliarmus', 'Patronus'],
    },
    {
      id: 6,
      name: 'Neville Longbottom',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Cherry, Unicorn Hair',
      spells: ['Expelliarmus', 'Herbivicus'],
    },
    {
      id: 7,
      name: 'Ginny Weasley',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Yew, Unknown Core',
      spells: ['Bat Bogey Hex', 'Stupefy', 'Reducto'],
    },
    {
      id: 8,
      name: 'Cedric Diggory',
      house: 'Hufflepuff',
      role: Role.STUDENT,
      status: Status.INACTIVE,
      wand: 'Ash, Unicorn Hair',
      spells: ['Accio', 'Expecto Patronum'],
    },
    {
      id: 9,
      name: 'Cho Chang',
      house: 'Ravenclaw',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Expelliarmus', 'Stupefy'],
    },
    {
      id: 10,
      name: 'Pansy Parkinson',
      house: 'Slytherin',
      role: Role.STUDENT,
      status: Status.ON_PROBATION,
      wand: 'Unknown, Unknown Core',
      spells: [],
    },
    {
      id: 11,
      name: 'Albus Dumbledore',
      house: 'Gryffindor',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Elder Wand, Thestral Tail Hair',
      spells: ['Expelliarmus', 'Lumos Maxima', 'Avada Kedavra', 'Fiendfyre', 'Sectumsempra'],
    },
    {
      id: 12,
      name: 'Severus Snape',
      house: 'Slytherin',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Sectumsempra', 'Legilimens', 'Expecto Patronum', 'Wingardium Leviosa'],
    },
    {
      id: 13,
      name: 'Minerva McGonagall',
      house: 'Gryffindor',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Fir, Dragon Heartstring',
      spells: ['Transfiguration', 'Piertotum Locomotor', 'Stupefy'],
    },
    {
      id: 14,
      name: 'Rubeus Hagrid',
      house: 'Gryffindor',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Oak, Unknown Core',
      spells: ['Wingardium Leviosa'],
    },
    {
      id: 15,
      name: 'Lord Voldemort',
      house: 'Slytherin',
      role: Role.DARK_LORD,
      status: Status.BANNED,
      wand: 'Yew, Phoenix Feather',
      spells: ['Avada Kedavra', 'Crucio', 'Imperio', 'Fiendfyre', 'Legilimens'],
    },
    {
      id: 16,
      name: 'Bellatrix Lestrange',
      house: 'Slytherin',
      role: Role.DEATH_EATER,
      status: Status.BANNED,
      wand: 'Walnut, Dragon Heartstring',
      spells: ['Crucio', 'Avada Kedavra', 'Fiendfyre'],
    },
    {
      id: 17,
      name: 'Sirius Black',
      house: 'Gryffindor',
      role: Role.ORDER_OF_THE_PHOENIX,
      status: Status.INACTIVE,
      wand: 'Unknown, Unknown Core',
      spells: ['Stupefy', 'Expelliarmus'],
    },
    {
      id: 18,
      name: 'Remus Lupin',
      house: 'Gryffindor',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Cypress, Unicorn Hair',
      spells: ['Expecto Patronum', 'Riddikulus', 'Stupefy'],
    },
    {
      id: 19,
      name: 'Dolores Umbridge',
      house: 'Slytherin',
      role: Role.PROFESSOR,
      status: Status.BANNED,
      wand: 'Birch, Dragon Heartstring',
      spells: ['Crucio', 'Incarcerous'],
    },
    {
      id: 20,
      name: 'Fred Weasley',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.INACTIVE,
      wand: 'Unknown, Unknown Core',
      spells: ['Accio', 'Bombarda'],
    },
    {
      id: 21,
      name: 'George Weasley',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Accio', 'Bombarda', 'Expelliarmus'],
    },
    {
      id: 22,
      name: 'Percy Weasley',
      house: 'Gryffindor',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Stupefy', 'Lumos'],
    },
    {
      id: 23,
      name: 'Fleur Delacour',
      house: 'Beauxbatons',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Rosewood, Veela Hair',
      spells: ['Accio', 'Immobulus', 'Expelliarmus'],
    },
    {
      id: 24,
      name: 'Viktor Krum',
      house: 'Durmstrang',
      role: Role.STUDENT,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Dragon Heartstring',
      spells: ['Conjunctivitis Curse', 'Stupefy'],
    },
    {
      id: 25,
      name: 'Nymphadora Tonks',
      house: 'Hufflepuff',
      role: Role.ORDER_OF_THE_PHOENIX,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Expelliarmus', 'Stupefy', 'Protego'],
    },
    {
      id: 26,
      name: 'Filius Flitwick',
      house: 'Ravenclaw',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Wingardium Leviosa', 'Piertotum Locomotor', 'Stupefy', 'Expelliarmus'],
    },
    {
      id: 27,
      name: 'Pomona Sprout',
      house: 'Hufflepuff',
      role: Role.PROFESSOR,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Herbivicus', 'Stupefy'],
    },
    {
      id: 28,
      name: 'Lucius Malfoy',
      house: 'Slytherin',
      role: Role.DEATH_EATER,
      status: Status.BANNED,
      wand: 'Elm, Dragon Heartstring',
      spells: ['Avada Kedavra', 'Imperio', 'Expelliarmus'],
    },
    {
      id: 29,
      name: 'Peter Pettigrew',
      house: 'Gryffindor',
      role: Role.DEATH_EATER,
      status: Status.BANNED,
      wand: 'Chestnut, Dragon Heartstring',
      spells: ['Avada Kedavra', 'Fidelius Charm'],
    },
    {
      id: 30,
      name: 'Alastor Moody',
      house: 'Gryffindor',
      role: Role.ORDER_OF_THE_PHOENIX,
      status: Status.IN_GOOD_STANDING,
      wand: 'Unknown, Unknown Core',
      spells: ['Stupefy', 'Expelliarmus', 'Avada Kedavra', 'Protego'],
    },
  ];

  for (const w of Users) {
    const user = await prisma.user.upsert({
      where: { id: w.id },
      update: {},
      create: {
        id: w.id,
        name: w.name,
        house: w.house,
        role: w.role,
        status: w.status,
        wand: w.wand,
        spells: {
          //   create: w.spells.map((name) => ({ spellId: spells[name].id })),
          create: w.spells.map((name) => {
            if (!spells[name]) console.error(`Missing spell: "${name}" for wizard: ${w.name}`);
            return { spellId: spells[name].id };
          }),
        },
      },
    });
    console.log(`  ✔ Wizard: ${user.name}`);
  }

  // ── Files (MinIO / S3 examples) ───────────────────────────────────────────

  const files = [
    { link: 'https://minio.example.com/bucket/harry-potter-profile.jpg' },
    { link: 'https://minio.example.com/bucket/hermione-granger-profile.jpg' },
  ];

  for (const file of files) {
    const record = await prisma.file.create({ data: file });
    console.log(`  ✔ File: ${record.id} → ${record.link}`);
  }

  console.log('\n✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
