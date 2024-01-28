const abilities = {
  'Lucian' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/LucianR.png?V3', ability: '<b>Arpeggio</b> <br /><br />Lucian fires 14 + 1 per 20% bonus Attack Speed shots towards the furthest enemy. Each shot explodes on the first enemy hit, dealing %AD+ %AP physical damage to all nearby enemies and reducing their Armor for the rest of combat. If Arpeggio ends early, gain Mana based on the number of unused shots.<br /><br />'}
  'Ziggs' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ZiggsE.png?V3', ability: '<b>Chaos Theory</b> <br /><br />Ziggs throws a bomb at the current target that deals magic damage. It splits into some bombs that Shred their target for 4 seconds and deal split magic damage. Each cast increases the number of bombs by 3.'}
  'Illaoi' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/IllaoiQ.png?V3', ability: '<b>Drums of the Deep</b> <br /><br />Passive: Every 3 seconds, Illaoi\'s tentacles deal % of Armor & Magic Resistance magic damage to nearby enemies. Active: Gain Armor and Magic Resist for 3.5 seconds. Revive or fully heal the lowest Health tentacle. Leap at the nearest enemy and deal magic damage in a large circle 3 times as tentacles slam in unison.<br /><br />'},
  'Yorick' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Yorick_P.png?V3', ability: '<b>GET IN THIS PIT!</b> <br /><br />Yorick summons headbanging ghouls that piles towards the center of the board. Each deals physical damage over three attacks. Ghouls\' damage 20% Sunders for 3 seconds. Every other cast also summons a BIG ghoul that deals physical damage each attack.'},
  'Qiyana' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/QiyanaR.png?V3', ability: '<b>Sample & Remix</b> <br /><br />Qiyana copies the current target\'s items and throw them to an ally. Deal physical damage and knock them back. If the target had no items, deal additional true damage and knock them back to the edge of the board instead.<br /><br />'},
  'Sona' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Sona_Passive_Charged.png?V3', ability: '<b>The Drop</b> <br /><br />Kinetic: Passive: Attacks instead send a beat to an ally, healing them for 5/8/100% of their maximum Health. Active: Send a beat to all allies and grant them a Shield. Ethereal Passive: Attacks instead send a beat to an ally, granting them 20/30/500% Attack Speed per Auto for 4 seconds. Active: Grant all allies 100/150/777% Attack Speed and magic damage on attack for 6 seconds. Concussive Passive: Attacks instead send a beat to an ally, granting both Sona and the ally 3/4/100 Ability Power. Active: Deal magic damage to the nearest enemies.<br /><br />'},
  'Kayn' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KaynQ.png?V3', ability: '<b>Fear the Reaper</b> <br /><br />Kayn dashes, then deal magic damage to all adjacent enemies and Chill them for 3 seconds. If Kayn only hits one target, he immediately casts again. Chill: Reduce Attack Speed by 20%<br /><br />'},
  'Jhin' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/JhinR.png?V3', ability: '<b>Concerto of Demise</b> <br /><br />Passive: Attacks generate 10 additional Mana. If your bench has 4 Grand Finale Rifles, begin conducting instead of attacking. Each Rifle fires at the same rate as the Maestro and deals %AD + %AP physical damage. Every 4th volley deals 200% damage. Active: Put 1 Grand Finale Rifle into one of your empty bench slots.<br /><br />'},
  'Twitch' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/TwitchVenomCask.png?V3', ability: '<b>Bottled Anarchy</b> <br /><br />Twitch throws an bottle at the current target, which deals 250%AD damage to enemies within 1 hex. It explodes into 4 shards; each dealing magic damage to a random enemy within 2 hexes. Each enemy critically struck by the bottle creates 1 more shard.<br /><br />'},
  'Vex' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/VexQ.png?V3', ability: '<b>Looming Darkness</b><br /><br />Vex tosses a shadow at the current target that Stuns enemies within 1 hex for 0.75 seconds. Then, it deals magic damage to enemies within 1 hex.<br /><br />'},
  'Akali KDA' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/AkaliR.png?V3', ability: '<b>The Baddest</b> <br /><br />Akali throws a shuriken at the farthest unmarked target, marking them. Dash to every marked enemy, striking them for physical damage and dealing physical damage to enemies dashed through.<br /><br />'},
  'Thresh' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ThreshE.png?V3', ability: '<b>Devil\'s Round Up</b><br /><br />Thresh stuns the largest group of nearby enemies and deal magic damage to each. Thresh heals for Base Amount + 50% of the total damage dealt.<br /><br />'},
  'Karthus' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KarthusFallenOne.png?V3', ability: '<b>Mortal Reminder</b> <br /><br />Karthus deals magic damage to the 4/4/6 lowest Health enemies. Gain 30% Ability Power after each cast.<br /><br />'},
  'Pantheon' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/PantheonE.png?V3', ability: '<b>Too Tough To Kill</b> <br /><br />Pantheon reduces damage taken by 20% + %AP(max 70%) for 2.5 seconds. Afterwards, deal 200%AD physical damage to the 3 enemies who have dealt the most damage to Pantheon.<br /><br />'},
  'Bard' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Bard_Passive.png?V3', ability: '<b>Improv</b><br /><br />Play a tune of 4 random notes from the following: Doot: Deal magic damage to the current target. Chime: Heal the lowest health ally for Health. Tip: Drop 1 gold and play another note. (Gain 3 Gold in Hyper Roll!)<br /><br />'},
  'Amumu' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Tantrum.png?V3', ability: '<b>Tantrum</b> <br /><br />Passive: When attacked, Amumu gains 2 Armor (stacks up to 25 times). Active: Deal magic damage to adjacent enemies. Every 3rd cast has double radius and Stuns enemies hit for 1.5 seconds.<br /><br />'},
  'Samira' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/SamiraP.png?V3', ability: '<b>Thrills & Kills</b> <br /><br />Passive: Samira\'s attacks that critically strike grant a stack of Style, up to 6 stacks. Each stack grants 20%Ability PowerAttack Speed. Active: Deal physical damage to the current target, then another 110%AD physical damage per Style stack. Afterwards, reset Style.<br /><br />'},
  'Ahri' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/AhriE.png?V3', ability: '<b>Idol\'s Charm</b> <br /><br />Ahri blows a kiss at the current target. It deals magic damage and briefly Stuns them. If the target has been kissed before, deal bonus magic damage.<br /><br />'},
  'Viego' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ViegoR.png?V3', ability: '<b>Riff of the Ruined King</b> <br /><br />Viego slams on a nearby hex. Deal physical damage to enemies within two hexes and mark them for 5%Ability Powerseconds. Marked enemies take 10% increased damage from all sources. Viego\'s attacks on marked enemies deal empowered physical damage instead.<br /><br />'},
  'Twisted Fate' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/WildCards.png?V3', ability: '<b>Hustle & Shuffle</b> <br /><br />Twisted Fate throws 21 + 1 per 20% bonus Attack Speed cards divided between the current target and 3 nearest enemies. They reduce Magic Resist by 1 and deal magic damage.<br /><br />'},
  'Akali True DMG' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/AkaliQ.png?V3', ability: '<b>Three Point Strike</b> <br /><br />Akali deals physical damage split between the closest three enemies three times. For each enemy that survives, refund mana.<br /><br />'},
  'Miss Fortune' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/MissFortuneRicochetShot.png?V3', ability: '<b>Double Up</b> <br /><br />Miss Fortune deals physical damage to the current target and physical damage to the closest target behind them. If either die, gain 40%AP Attack Speed for 4 seconds.<br /><br />'},
  'Annie' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Annie_Passive.png?V3', ability: '<b>Disintegrate</b> <br /><br />Passive: After casting 4 times, Annie gains 40% Attack Speed and target 1 additional nearby enemy with casts. Active: Deal magic damage to the current target.<br /><br />'},
  'Seraphine' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/SeraphineQ.png?V3', ability: '<b>High Note</b> <br /><br />Seraphine sends a high note to the largest clump of units that hits all units within 1 hex. Enemies take magic damage. Allies heal.<br /><br />'},
  'Nami' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/NamiQ.png?V3', ability: '<b>Disco Prison</b> <br /><br />Nami deals magic damage to the current target and Stun them for 1.25 seconds.<br /><br />'},
  'Vi' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ViPassive.png?V3', ability: '<b>The Harder They Fall</b> <br /><br />Vi deals 330%AD physical damage to the current target, or 450%AD physical damage if they have more current Health than Vi. Stun them and reduce their Armor for the rest of combat.<br /><br />'},
  'Lillia' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Lillia_Icon_Passive.png?V3', ability: '<b>Confetti Bloom</b> <br /><br />Lillia deals magic damage to adjacent enemies. Heal Lillia and her nearest ally.<br /><br />'},
  'Blitzcrank' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Blitzcrank_ManaBarrier.png?V3', ability: '<b>Boogie Barrier</b> <br /><br />Passive: Blitzcrank deals magic damage to a nearby enemy every 2 seconds. Active: Gain a Shield. For 5 seconds, deal Passive damage every second instead. Enemies hit take an additional 1% of their max Health as magic damage.<br /><br />'},
  'Evelynn' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/EvelynnE.png?V3', ability: '<b>Whiplash</b> <br /><br />Evelynn deals magic damage to the current target. For 4 seconds, gain 150% Attack Speed and restore Health on attack.<br /><br />'},
  'Neeko' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Neeko_P.png?V3', ability: '<b>Cosplay</b> <br /><br />Neeko cosplays the highest Health ally and gain a Shield + 6% of the ally\'s Health for 4 seconds. When it breaks, deal % of its initial value as magic damage to adjacent enemies.<br /><br />'},
  'Kayle' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KayleE.png?V3', ability: '<b>Fires of Ascension</b> <br /><br />For 5 seconds, Kayle\'s attacks deal bonus magic damage in waves at the current target and behind them. Shreds enemies hit for 4 seconds. Finally, deal magic damage to enemies around the target.<br /><br />'},
  'Jinx' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/JinxQ.png?V3', ability: '<b>Escalation</b> <br /><br />Passive Minigun: Jinx\'s attacks grant her 4% AP Attack Speed. Passive Rocket Launcher: Attacks deal 50% AD bonus physical damage. Active: Swap between Minigun and Rocket Launcher.<br /><br />'},
  'Urgot' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Urgot_Passive.png?V3', ability: '<b>Fire from his Fingertips</b> <br /><br />For 8 seconds, Urgot converts bonus Attack Speed to Attack Damage. Attacks deal physical damage in a cone and grant Urgot 20% of the damage dealt as a 5 second Shield. Urgot deals 50% bonus damage if his spell only hits 1 target.<br /><br />'},
  'Gragas' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/GragasPassiveHeal.png?V3', ability: '<b>Boogie Hour</b> <br /><br />Gragas heals himself over 2 seconds. Then, deals magic damage to adjacent enemies and Chill them for 3 seconds.<br /><br />'},
  'Caitlyn' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/CaitlynR.png?V3', ability: '<b>Champ Hunt</b> <br /><br />Caitlyn shoots at the 4 furthest enemies. Shots deal physical damage to the first enemy hit.<br /><br />'},
  'Lulu' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/LuluQ.png?V3', ability: '<b>Saccharine Love</b> <br /><br />Lulu fires a bolt toward the current target. It deals magic damage to the first enemy it passes through and magic damage to the second. Every 3rd cast, Stun the 3 nearest enemies for 1.5 seconds and deal magic damage instead.<br /><br />'},
  'Ekko' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/EkkoW.png?V3', ability: '<b>Record Scratch</b> <br /><br />Ekko deals magic damage to enemies within 2 hexes and Stuns them for 1 second(s). Gain Shield for 4 seconds.<br /><br />'},
  'Taric' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Taric_Passive.png?V3', ability: '<b>Mirrorball\'s Blessing</b> <br /><br />Taric gains a Base Amount + 6% of Health Shield for 4 seconds. Taric\'s next 2 attacks deal bonus magic damage.<br /><br />'},
  'Gnar' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Gnar_Passive.png?V3', ability: '<b>Rabid Fandom</b> <br /><br />Leap over the current target and transform into Mega Gnar for the rest of combat, gaining Health and 70% Attack Damage. Subsequent casts deal physical damage to the current target.<br /><br />'},
  'Katarina' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KatarinaW.png?V3', ability: '<b>Bouncing Blade</b> <br /><br />Katarina throws a blade at the current target that bounces 3 times, dealing magic damage and applying Wound for 6 seconds.<br /><br />'},
  'Mordekaiser' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/MordekaiserW.png?V3', ability: '<b>Face-Melter</b> <br /><br />Mordekaiser gains a Shield and deal magic damage to adjacent enemies over 3 seconds. Afterwards, deal magic damage to nearby enemies. When Face-Melter kills an enemy, gain 4% Ability Power and Attack Damage, and 4 Armor and Magic Resist.<br /><br />'},
  'Zed' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ZedP.ZedNewIcons.png?V3', ability: '<b>Shadow Dance</b> <br /><br />Zed marks the current target and spawn an untargetable Shadow with % of Attack Damage for 4 seconds. After a brief delay or when the marked enemy falls below 15% health, deal additional physical damage.<br /><br />'},
  'Kennen' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KennenBringTheLight.png?V3', ability: '<b>Shock and Awe</b> <br /><br />Kennen discharges 2 Jolts over 2 seconds. Each Jolt deals magic damage to a random enemy within range and Stuns them for 0.75 seconds.<br /><br />'},
  'Kai\'Sa' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KaisaR.png?V3', ability: '<b>Got the Boom</b> <br /><br />Kai\'Sa dashes up to 2 hexes and fire a missile at the current target. It deals %AD+ %AP physical damage to the first enemy hit.<br /><br />'},
  'Corki' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/MissileBarrage.png?V3', ability: '<b>Blown to 8 Bits</b> <br /><br />Corki deals 320% physical damage to enemies within 1 hex of the current target and Wound them for a few seconds.<br /><br />'},
  'Olaf' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Olaf_Passive.png?V3', ability: '<b>Berserker Rage</b> <br /><br />Passive: Olaf heals %AP on attack. For every 1% missing Health, gain 0.15% of Health as Attack Speed.<br /><br />'},
  'Ezreal' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/EzrealE.png?V3', ability: '<b>Crash the Party</b> <br /><br />Ezreal blinks away from the current target and deal physical damage to them. Every 3rd cast, deal physical damage to all enemies in a line.<br /><br />'},
  'Tahm Kench' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/TahmKenchE.png?V3', ability: '<b>Rawhide</b> <br /><br />Passive: Tahm Kench reduces each instance of incoming damage.<br /><br />'},
  'Poppy' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/PoppyW.png?V3', ability: '<b>Hammer Time</b> <br /><br />Passive: Poppy gains Attack Damage based on bonus Health. Active: Gain 100 Armor and Magic Resistance for 6 seconds and hammer the nearest enemy 3 times, dealing physical damage and healing 5% on each hit. If this kills an enemy, slam an additional time.<br /><br />'},
  'Sett' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Sett_P.png?V3', ability: '<b>THE PUNCHLINE</b> <br /><br />Sett gains a Shield for 2 seconds, increased by 1 for every 4 missing Health. Deal magic damage to the current target and magic damage to enemies in a cone around them.<br /><br />'},
  'Garen' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Garen_Passive.png?V3', ability: '<b>Power-Up!</b> <br /><br />Gain max Health. Garen\'s next attack deals 160% AD +10% of Health physical damage.<br /><br />'},
  'Yasuo' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/Yasuo_Passive.png?V3', ability: '<b>Synthesizer Strike</b> <br /><br />Passive: Yasuo permanently gains 1.5% Attack Damage when he kills an enemy champion (doubled in Hyper Roll). Active: Deal 280%AD + 20%AP damage to the current target.<br /><br />'},
  'Senna' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/SennaR.png?V3', ability: '<b>Concussive Noise</b> <br /><br />Senna fires a blast of sound at the current target\'s location. It pulses 3 times, each dealing magic damage to enemies within 1 hex.<br /><br />'},
  'Zac' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ZacR.png?V3', ability: '<b>Let\'s Bounce!</b> <br /><br />Zac bounces 3 times on nearby enemies. Each bounce deals magic damage, Stuns for 1 second, and heals Zac.<br /><br />'},
  'Lux' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/LuxR.png?V3', ability: '<b>Laser Light Show</b> <br /><br />Lux fires a beam of light at the farthest enemy, dealing magic damage to all enemies it hits.<br /><br />'},
  'Riven' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/RivenFeint.png?V3', ability: '<b>Voxel Defense</b> <br /><br />For the next 6 seconds, Riven gains a 250%AD + %AP Shield and attacks deal 90% of AD bonus physical damage to enemies within 1 hex of the target.<br /><br />'},
  'Jax' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/JaxQ.png?V3', ability: '<b>Counter Melody</b> <br /><br />Leap at the highest Health enemy within 1 + Attack Range and deal magic damage to them. Then, deal magic damage to all adjacent enemies. Gain 10% Attack Damage and Ability Power for the rest of combat.<br /><br />'},
  'Yone' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/YonePassive.png?V3', ability: '<b>Pop Off</b> <br /><br />Yone gains 8%AP stacking Move Speed and Omnivamp for the rest of combat. Slash twice, dealing physical damage to enemies in a cone each time.<br /><br />'},
  'Aphelios' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/ApheliosR.png?V3', ability: '<b>Moonlight Lullaby</b> <br /><br />Aphelios deals 725% physical damage and Stuns the current target for a few seconds. Deal physical damage to enemies within 1 hex. If the original target dies, Stun enemies within 1 hex for 1 second.<br /><br />'},
  'K\'Sante' : {image: 'https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/KSanteW.png?V3', ability: '<b>Block the Haters</b> <br /><br />K\'Sante enters a defensive stance, reducing damage taken by 20% + %AP(max 75%) for 2.5 seconds. Afterwards, deal 800% Attack Damagephysical damage to the current target.<br /><br />'}
}

function AbilitiesList(championList, team, enemyPositions=[]) {
  var returnList = [];
  var column = 0;
  var row = 7;

  if (team === 'enemy') {
    for (var i = 0; i < championList.length; i++) {
      const championPair = championList[i];
      const champion = champions[championPair[0]];
      const starLevel = championPair[1];
      const headliner = championPair[2];
      const items = championPair[3];

      const left = enemyPositions[i][0];
      const top = enemyPositions[i][1];

      if (starLevel === 1) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: left, top: top }, currentPosition: { left: convertToPixels(left, 'left', top%2 === 1) - 25, top: convertToPixels(top, 'top', top%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.oneStarHealth, originalHealth: champion.oneStarHealth, attackDamage: champion.oneStarAD };
        returnList.push(ItemsList(newChampion));
      } else if (starLevel === 2) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: left, top: top }, currentPosition: { left: convertToPixels(left, 'left', top%2 === 1) - 25, top: convertToPixels(top, 'top', top%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.twoStarHealth, originalHealth: champion.twoStarHealth, attackDamage: champion.twoStarAD };
        returnList.push(ItemsList(newChampion));
      } else {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: left, top: top }, currentPosition: { left: convertToPixels(left, 'left', top%2 === 1) - 25, top: convertToPixels(top, 'top', top%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.threeStarHealth, originalHealth: champion.threeStarHealth, attackDamage: champion.threeStarAD };
        returnList.push(ItemsList(newChampion));
      }
    }
  } else {
    for (var i = 0; i < championList.length; i++) {
      const championPair = championList[i];
      const champion = champions[championPair[0]];
      const starLevel = championPair[1];
      const headliner = championPair[2];
      const items = championPair[3];
  
      if (starLevel === 1) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 === 1) - 25, top: convertToPixels(row, 'top', row%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.oneStarHealth, originalHealth: champion.oneStarHealth, attackDamage: champion.oneStarAD };
        returnList.push(ItemsList(newChampion));
      } else if (starLevel === 2) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 === 1) - 25, top: convertToPixels(row, 'top', row%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.twoStarHealth, originalHealth: champion.twoStarHealth, attackDamage: champion.twoStarAD };
        returnList.push(ItemsList(newChampion));
      } else {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 === 1) - 25, top: convertToPixels(row, 'top', row%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.threeStarHealth, originalHealth: champion.threeStarHealth, attackDamage: champion.threeStarAD };
        returnList.push(ItemsList(newChampion));
      }
  
      column = column + 1;
      if (column >= 7) {
        column = 0;
        row = row - 1;
      }
    }
  }
  return returnList;
}

export default ChampionsList;
export {ATTACK_SPEED};