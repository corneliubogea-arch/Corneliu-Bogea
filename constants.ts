import type { Equipment, EquipmentType, EvaluationLevel, PreventiveTask } from './types';

const createConveyors = (start: number, end: number, prefix = 'B'): string[] => {
  const conveyors: string[] = [];
  for (let i = start; i <= end; i++) {
    conveyors.push(`Conveior ${prefix}${i}`);
  }
  return conveyors;
};

export const EQUIPMENT_LINE_1_NAMES: string[] = [
  'Desfăcător de Saci',
  ...createConveyors(1, 20),
  'Separator Balistic',
  'Separator Optic SO1',
  'Separator Optic SO2',
  'Separator Optic SO3',
  'Separator Optic SO4',
  'Separator Neferoase (Eddy curent)',
  'Separator Metale',
  'Presa de Balotat Anis',
  'Presa de Balotat MAC107',
  'Presa de Balotat PAL',
  'Compresor Aer Atlas Copco CA1'
];

export const EQUIPMENT_LINE_2_NAMES: string[] = [
  'Sita Rotativa',
  ...createConveyors(21, 41),
  'Separator Balistic',
  'Separator Optic SO1(2)',
  'Separator Optic SO2(2)',
  'Separator Neferoase (Eddy curent)',
  'Separator Metale',
  'Presa de Balotat HSM',
  'Compresor Aer Atlas Copco CA2'
];

export const NON_CONFORMITIES_BY_TYPE: Record<EquipmentType, string[]> = {
  'Conveior': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare', 'Zgomote suspecte', 'Stare neconforma Tamburi', 'Stare neconforma Role', 'Stare neconforma covor de cauciuc', 'Stare neconforma Razuri', 'Stare neconforma fasie cauciuc etansare laterala covor cauciuc', 'Stare neconforma Racleti', 'Uzura inele cauciuc suport covor', 'Dereglare pozitie covor pe tamburi', 'Integritate dispozitive si sisteme de siguranta', 'Neconformitati grup antrenare (motoreductor)'],
  'Sortator Optic': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma Tamburi', 'Stare neconforma duze de suflare', 'Stare neconforma covor de cauciuc', 'Stare neconforma scaner', 'Stare neconforma fasie cauciuc etansare laterala covor cauciuc', 'Stare neconforma instalatie aer', 'Uzura inele suport covor', 'Dereglare pozitie covor pe tamburi', 'Integritate dispozitive si sisteme de siguranta', 'Neconformitati grup antrenare (motoreductor)'],
  'Separator Balistic': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma padele', 'Stare neconforma strangere site padele', 'Integritate dispozitive si finctionare sisteme de siguranta', 'Neconformitati grup antrenare (motoreductor)', 'Neconformitati integritate structura', 'Neconformitati functionare instalatie electrica'],
  'Separator Neferoase': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma covor de cauciuc', 'Neconformitati functionare instalatie electrica', 'Neconformitati grup antrenare (motoreductor)', 'Necorelare turatie magnet', 'Performanta necorespunzatoare de sortare'],
  'Separator Metale': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma covor de cauciuc', 'Neconformitati functionare instalatie electrica', 'Neconformitati grup antrenare (motoreductor)', 'Neconformitate pozitie magnet', 'Performanta necorespunzatoare de sortare', 'Integritate dispozitive si stare de functionare sisteme de siguranta', 'Dereglare pozitie covor pe tamburi'],
  'Sita Rotativa': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma site si de fixare', 'Neconformitati functionare instalatie electrica', 'Neconformitati grup antrenare (motoreductor)', 'Integritate dispozitive si stare de functionare sisteme de siguranta', 'Neconformitati integritate structura'],
  'Desfacator de Saci': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma cutite de dezmembrare', 'Neconformitati functionare instalatie electrica', 'Neconformitati grup antrenare (motoreductor)', 'Integritate dispozitive si stare de functionare sisteme de siguranta', 'Neconformitati integritate structura', 'Neconformitati functionare instalatie hidraulica'],
  'Presa de Balotat': ['Lipsa curatare sau curatare insuficienta', 'Lipsa gresare lagare', 'Zgomote suspecte', 'Stare neconforma cutit contracutit placa de presare', 'Stare neconforma legatori', 'Neconformitati ace de legare', 'Neconformitati functionare instalatie electrica', 'Neconformitati grup antrenare (motoreductor)', 'Integritate dispozitive si stare de functionare sisteme de siguranta', 'Neconformitati integritate structura', 'Neconformitati functionare instalatie hidraulica'],
  'Compresor Aer': ['Lipsa curatare filtre aer', 'Integritate dispozitive si stare de functionare sisteme de siguranta', 'Neconformitati integritate structura', 'Neconformitati functionare instalatie hidraulica', 'Neconformitati functionare instalatie pneumatica'],
  'Necunoscut': ['Neconformitate nespecificată']
};

export const getEquipmentTypeFromName = (name: string): EquipmentType => {
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.startsWith('conveior')) return 'Conveior';
  if (lowerCaseName.includes('optic')) return 'Sortator Optic';
  if (lowerCaseName.includes('balistic')) return 'Separator Balistic';
  if (lowerCaseName.includes('neferoase')) return 'Separator Neferoase';
  if (lowerCaseName.includes('metale')) return 'Separator Metale';
  if (lowerCaseName.includes('sita rotativa')) return 'Sita Rotativa';
  if (lowerCaseName.includes('desfăcător de saci')) return 'Desfacator de Saci';
  if (lowerCaseName.includes('presa de balotat')) return 'Presa de Balotat';
  if (lowerCaseName.includes('compresor aer')) return 'Compresor Aer';
  return 'Necunoscut';
};

const MAINTENANCE_TASKS = {
    'Presa de Balotat HSM': ['Verificarea si curatarea cutitelor de forfecare', 'Verificare șpalt tăiere placă presare', 'Schimbare lichid hidraulic', 'Curățare filtru de retur', 'Schimbare filtru de ulei', 'Lubrifiere role ghidare placă de presare', 'Curățare și gresare role capete de ac', 'Curățare și verificare electromotoare', 'Verificare și strângere cupluri', 'Verificare / Curatare cai de rulare / dispozitive de evacuare cai de rulare', 'Verificarea discurilor de rasucire', 'Curatare si lubrifiere Dispozitiv de Expulzare a Marginilor de Taiere'],
    'Separator Balistic': ['Strangere suruburi la placile de strangere la cadru pivotant (cap 8.4.1)', 'Strangere suruburi Padele', 'Lubrifiere lagare', 'Verificare stangere suruburi', 'Verificare cabluri electrice', 'Veficare comutator oprire de urgenta', 'Verificare comutator usi', 'Verificare cuplaj', 'Verificare site grila de la Padele', 'Curatare si verificare platformei de intretinere curente', 'Verificare protectie de infasurare cadru pivotant', 'Lucrari intretinere sistem electric de actionare'],
    'Presa de Balotat MAC107': ['Curățat cartușul filtrului de aer de pe rezervor cu aer comprimat', 'Curățat radiatorul a schimbătorului de căldură', 'Verificat tensionarea lanțului de pe căruciorului acelor', 'Verificat nivelul de ulei din rezervor', 'Verificati nivelul de ulei din reductoare', 'Lubrifiat zonele de rulare a sârmei de legare', 'Gresat rotile inferioare si rolele de ghidare ale capului de presare ("berbec")', 'Gresat căruciorul acelor și acele', 'Spălat cu solvent și uscați bine cu aer comprimat cartușul filtrului de ulei.', 'Curățat cartușul filtrului de aer cu aer comprimat.', 'Curățat tabloul de comanda (opriti alimentarea cu energie electrica inaine de deschidere panou electric)', 'Verificat garnitura colectorului de ulei de pe capul căruciorului cilindrului', 'Verificat distanța dintre lamele căruciorului și cele ale traversei: trebuie să fie de aprox 3mm', 'Verificat strângerea cârligelor de răsucire a sârmei.', 'Verificat ca lamele de tăiere a sârmei taie corect, altfel ajustați cele două suporturi ale lamelor folosind cele trei șuruburi de ajustare.', 'Verificare rolele de ghidare laterale si verticale ale căruciorului se rotesc liber fără blocaje', 'Inlocuirea uleiului hidraulic'],
    'Conveior': ['Starea si eficienta stergatoarelor / razuri ( intre covorul de banda si lamela stergatorului nu trebuie sa existe interstitii. Stergatorul trebuie sa fie usor tensionat pe banda )', 'Starea fasiilor laterale de cauciuc ( h = 160 mm) ( nu trebuie sa fie desprinse din suruburi si nu trebuie sa aiba uzuri excesive care sa afecteze etansarea cu banda)', 'Starea suprafetelor dintre tamburii de actionare-intoarcere si banda ( se inlatura materialele care au aderat intre tamburi si covorul de banda )', 'Gresarea tamburilor de actionare-intoarcere', 'Reglarea covorului de banda (centrare, intindere)', 'Nivel ulei reductor', 'Geometria structurii metalice', 'Starea cordoanelor de sudura', 'Strangerea tuturor suruburilor', 'Verificarea tuturor rolelor , a covorului de banda, a fasiilor de cauciuc pt. etansare ( h= 160 mm), a tamburilor de actionare si intoarcere', 'Schimbare ulei reductoare'],
    'Desfacator de Saci': ['Verificarea uzurilor si jocurilor cutitelor', 'Verificati varfurile filetate si ghidajele', 'Ungeti rotile pe ambele parti ale camelor. In functie de natura materialului de alimentare, rotile trebuies lubrifriate la fiecare 40 pana la 120 ore de lucru', 'Inspectia vizuala a rotorului', 'Curatirea rotorului', 'Verificat controlul initierii vitezei rotorului', 'Verificat nivelul de ulei din cuplaj SEW', 'Verificat scurgerile motoreductorului', 'Verificat turbo ambreiajul la scurgeri', 'Verificat atasamentele pieptenului sa nu fie deteriorate', 'Verificat uzura si deteriorarea cilindrilor', 'Verificat etanseitatea sistemului hidraulic', 'Verificat nivelul uleiului la vizorul transparent al agregatului', 'Verificat uzura si ruperea cutitelor pieptenului'],
    'Sortator Optic': ['Verificat funcționarea corectă a circuitului de siguranță', 'Verificat şi, dacă este necesar,strangeti racordurile filetate', 'Verificat conexiunilor electrice', 'Efectuat insepctia vizuala a protectiei impotriva uzurii', 'Indepartat acumularile de materiale si alte reziduuri', 'Verificat senzorii usilor de protectie', 'Verificat ecranul cu privire la orice mesaje de eroare.', 'Curatat ecranul tactil', 'Curatat schimbatorul de caldura daca este necesar.', 'Efectuat insepectia vizuala a schimbatorului de caldura', 'Indepartat praful si murdaria de pe geamurile scanerului', 'Verificati starea lampilor cu halogen.', 'Inspectat capacul senzorului EM', 'Verificat functia de reglare a inaltimii senzor EM', 'Indepartat reziduurile la bloc de supape si duze', 'Curatat capcul barei cu duze', 'Curatat spatiul dintre bara cu duze si transportor', 'Curatati blocul de supape', 'Efectuat o testare a supapelor', 'Curatat duzele', 'Verificat presiunea aerului', 'Indepartat reziduurile de pe unitatile pneumatice', 'Golit apa din rezervor', 'Inlocuit filtrul de aer', 'Indepartat reziduurile la sistemul de pozitionare a blocului de valve', 'Efectuati o inspectie vizuala la sistemul de pozitionare a blocului de valve', 'Masurati viteza benzii', 'Calibrare VIS', 'Calibrare NIR', 'Calibrare DLA', 'Calibrare EM'],
    'Presa de Balotat Anis': ['Controlați calitatea uleiului Înlocuiți filtrul de ulei / 2000 ore', 'Înlocuiți filtrul de ulei si filtru aerisitorului / 2000 ore', 'Verificati presiunea maximă a pompei / 2000 ore', 'Schimbati filtrul de presiune de pe conducta de retur / 2000 ore', 'Verificare lama exterioară si interioara de tăiere a firului / 40 ore', 'Verificare capul acului de împingere/ 40 ore', 'Tija acului de tragere / 40 ore', 'Rolele acului / 40 ore', 'Ungerea bucșei acului / 40 ore', 'Întrerupătorul de proximitate - superior si inferior / 40 ore', 'Curățarea capului acului / 40 ore', 'Fixarea corpului acului / 40 ore', 'Pierderi de ulei / 40 ore', 'Ghidajul lateral (superior) - stânga si dreapta berbec/ 40 ore', 'Clapeta superioară - racletă; / 40 ore', 'Racleta frontală / 40 ore', 'Racletele dintre role / 40 ore', 'Clapeta posterioară - racletă / 40 ore', 'Fantele pentru fir (ac) / 40 ore', 'Spațiul de sub berbec', 'Spațiu stânga - dreapta / 40 ore', 'Rolele berbecului (lubrifiere) / 40 ore', 'Lamele de forfecare (spațiu) / 40 ore', 'Flanșa de fixare a tijei', 'Strângerea și sudura flanșei cilindru principal / 320 ore', 'Bolțurile de fixare a cilindrilor (lubrifiere) cilindru principal / 320 ore', 'Fixarea și pierderile pe la bucșa de capăt cilindru principal / 320 ore', 'Suprafața tijei cilindru principal / 320 ore', 'Sudura platformei la cilindru principal / 320 ore', 'Conexiunea posterioară SAE a conductei. / 320 ore', 'Conexiunea frontală SAE a conductei. / 320 ore', 'Zgomotul la retragerea completă a cilindrului. / 320 ore', 'Bolțurile de basculare canal. / 40 ore', 'Brațele de strângere . / 40 ore', 'Cilindri - fixare și scurgeri / 40 ore', 'Bolțuri (lubrifiere) / 40 ore', 'Bolțul cilindrului de tensionare- verificare. / 960 ore', 'Fixarea și pierderile pe la bucșa de capăt a cilindrului de tensionare. / 960 ore', 'Suprafața tijei cilindru de tensionare', 'Sudura platformei / 960 ore', 'Rola de bază D 100 mm ghidaje fir / 40 ore', 'Rolele acelor (sistemul de legare) / 40 ore', 'Rolele laterale (bara mobilă) / 40 ore', 'Suportul bobinei de fir - fixare / 40 ore', 'Senzori optici - buncăr / 320 ore', 'Verificare senzori poziția retrasă a berbeculu / 320 ore', 'Verificare senzori poziția avansata (de legare) a berbeculu / 320 ore', 'Verificare senzori poziția de forfecare a berbecului / mediana / retrasa a acelor / 320 ore', 'Poziția acelor pentru tăierea firului / 320 ore', 'Poziția frontală a acelor / 320 ore', 'Poziția cârligelor de răsucire / 320 ore', 'Contorul pentru lungimea balotului / 320 ore', 'Ușa cu sistem de inter- blocare a buncărului', 'Elementul de inter-blocare a sistemului automat de legare în poziția de operare / 500 ore', 'Ușa cu sistem de inter-blocare din partea opusă sistemului de legare / 500 ore', 'Elementele laterale fixe de protecție a berbecului / 500 ore', 'Capacele fixe superioare ale berbecului / 500 ore', 'Capacele laterale fixe ale sistemului de legare / 500 ore', 'Capacul posterior al sistemului de legare / 500 ore', 'Sistemul de schimb cu cheie / 500 ore'],
    'Presa de Balotat PAL': ['Curățat cartușul filtrului de aer de pe rezervor cu aer comprimat', 'Curățat radiatorul a schimbătorului de căldură', 'Verificat tensionarea lanțului de pe căruciorului acelor', 'Verificat nivelul de ulei din rezervor', 'Verificati nivelul de ulei din reductoare', 'Lubrifiat zonele de rulare a sârmei de legare', 'Gresat rotile inferioare si rolele de ghidare ale capului de presare ("berbec")', 'Gresat căruciorul acelor și acele', 'Spălat cu solvent și uscați bine cu aer comprimat cartușul filtrului de ulei.', 'Curățat cartușul filtrului de aer cu aer comprimat.', 'Curățat tabloul de comanda (opriti alimentarea cu energie electrica inaine de deschidere panou electric)', 'Verificat garnitura colectorului de ulei de pe capul căruciorului cilindrului', 'Verificat distanța dintre lamele căruciorului și cele ale traversei: trebuie să fie de aprox 3mm', 'Verificat strângerea cârligelor de răsucire a sârmei.', 'Verificat ca lamele de tăiere a sârmei taie corect, altfel ajustați cele două suporturi ale lamelor folosind cele trei șuruburi de ajustare.', 'Verificare rolele de ghidare laterale si verticale ale căruciorului se rotesc liber fără blocaje', 'Inlocuirea uleiului hidraulic'],
};

export const getMaintenanceTasksForEquipment = (equipment: Equipment): string[] => {
    const lowerCaseName = equipment.name.toLowerCase();

    // Specific balers by name
    if (lowerCaseName.includes('hsm')) return MAINTENANCE_TASKS['Presa de Balotat HSM'] || [];
    if (lowerCaseName.includes('mac107')) return MAINTENANCE_TASKS['Presa de Balotat MAC107'] || [];
    if (lowerCaseName.includes('anis')) return MAINTENANCE_TASKS['Presa de Balotat Anis'] || [];
    if (lowerCaseName.includes('pal')) return MAINTENANCE_TASKS['Presa de Balotat PAL'] || [];

    // General types
    switch (equipment.equipmentType) {
        case 'Conveior': return MAINTENANCE_TASKS['Conveior'] || [];
        case 'Separator Balistic': return MAINTENANCE_TASKS['Separator Balistic'] || [];
        case 'Desfacator de Saci': return MAINTENANCE_TASKS['Desfacator de Saci'] || [];
        case 'Sortator Optic': return MAINTENANCE_TASKS['Sortator Optic'] || [];
        default: return [];
    }
};

const CONVEYOR_LIKE_PREVENTIVE_TASKS: PreventiveTask[] = [
    { description: 'Starea si eficienta stergatoarelor ( intre covorul de banda si lamela stergatorului nu trebuie sa existe interstitii. Stergatorul trebuie sa fie usor tensionat pe banda )', frequency: 40 },
    { description: 'Starea fasiilor laterale de cauciuc ( h = 160 mm) ( nu trebuie sa fie desprinse din suruburi si nu trebuie sa aiba uzuri excesive care sa afecteze etansarea cu banda)', frequency: 40 },
    { description: 'Starea suprafetelor dintre tamburii de actionare-intoarcere si banda ( se inlatura materialele care au aderat intre tamburi si covorul de banda )', frequency: 160 },
    { description: 'Gresarea tamburilor de actionare-intoarcere', frequency: 480 },
    { description: 'Reglarea covorului de banda (centrare, intindere)', frequency: 480 },
    { description: 'Nivel ulei reductor', frequency: 480 },
    { description: 'Geometria structurii metalice', frequency: 1000 },
    { description: 'Starea cordoanelor de sudura', frequency: 1000 },
    { description: 'Strangerea tuturor suruburilor', frequency: 1000 },
    { description: 'Verificarea tuturor rolelor , a covorului de banda, a fasiilor de cauciuc pt. etansare ( h= 160 mm), a tamburilor de actionare si intoarcere', frequency: 1000 },
    { description: 'Schimbare ulei reductoare', frequency: 4000 },
];


const PREVENTIVE_TASKS: Record<string, PreventiveTask[]> = {
    'Presa de Balotat HSM': [
        { description: 'Verificarea si curatarea cutitelor de forfecare (secțiunea9.2)', frequency: 170 },
        { description: 'Verificare șpalt tăiere placă presare (secțiunea 8.4.1)', frequency: 170 },
        { description: 'Schimbare lichid hidraulic (secțiunea 8.3.1)', frequency: 2000 },
        { description: 'Curățare filtru de retur (secțiunea 8.3.2)', frequency: 1000 },
        { description: 'Schimbare filtru de ulei', frequency: 2000 },
        { description: 'Lubrifiere role ghidare placă de presare (secțiunea 8.4.2)', frequency: 40 },
        { description: 'Curățare și gresare role capete de ac (secțiunea 9.3)', frequency: 24 },
        { description: 'Curățare și verificare electromotoare (secțiunea 9.4)', frequency: 500 },
        { description: 'Curatare perforator', frequency: 170 },
        { description: 'Lubrifiere perforator (secțiunea 8.8)', frequency: 170 },
        { description: 'Curățare și lubrifiere unitate de alunecare perforator (secțiunea 8.9)', frequency: 170 },
        { description: 'Verificare și strângere cupluri (secțiunea 8.2.4)', frequency: 170 },
        { description: 'Verificare / Curatare cai de rulare / dispozitive de evacuare cai de rulare', frequency: 24 },
        { description: 'Verificarea discurilor de rasucire', frequency: 170 },
        { description: 'Curatare si lubrifiere Dispozitiv de Expulzare a Marginilor de Taiere', frequency: 500 },
    ],
    'Separator Balistic': [
        { description: 'Strangere suruburi la placile de strangere la cadru pivotant (cap 8.4.1)', frequency: 20 },
        { description: 'Strangere suruburi Padele (cap 8.4.2)', frequency: 24 },
        { description: 'Lubrifiere lagare (8.4.12)', frequency: 40 },
        { description: 'Verificare stangere suruburi (8.4.13)', frequency: 160 },
        { description: 'Verificare cabluri electrice (8.4.14)', frequency: 160 },
        { description: 'Veficare comutator oprire de urgenta (8.4.15)', frequency: 160 },
        { description: 'Verificare comutator usi (8.4.16)', frequency: 160 },
        { description: 'Verificare cuplaj (8.4.17)', frequency: 160 },
        { description: 'Verificare site grila de la Padele (8.4.20)', frequency: 2000 },
        { description: 'Curatare si verificare platformei de intretinere curente', frequency: 2000 },
        { description: 'Verificare protectie de infasurare cadru pivotant', frequency: 2000 },
        { description: 'Lucrari intretinere sistem electric de actionare', frequency: 2000 },
        { description: 'Verificare Vizuala toate componente (cap 8.4.3.)', frequency: 24 },
    ],
    'Presa de Balotat MAC107': [
        { description: 'Curățați cartușul filtrului de aer de pe rezervor cu aer comprimat', frequency: 40 },
        { description: 'Curățați radiatorul a schimbătorului de căldură', frequency: 40 },
        { description: 'Verificați tensionarea lanțului de pe căruciorului acelor', frequency: 40 },
        { description: 'Verificați nivelul de ulei din rezervor', frequency: 40 },
        { description: 'Verificați nivelul de ulei din reductoare', frequency: 160 },
        { description: 'Lubrifiați zonele de rulare a sârmei de legare', frequency: 160 },
        { description: 'Gresati rotile inferioare si rolele de ghidare ale capului de presare ("berbec")', frequency: 160 },
        { description: 'Gresați căruciorul acelor și acele', frequency: 160 },
        { description: 'Spălați cu solvent și uscați bine cu aer comprimat cartușul filtrului de ulei.', frequency: 160 },
        { description: 'Curățați cartușul filtrului de aer cu aer comprimat.', frequency: 160 },
        { description: 'Curățați tabloul de comanda (opriti alimentarea cu energie electrica inaine de deschidere panou electric)', frequency: 160 },
        { description: 'Verificați garnitura colectorului de ulei de pe capul căruciorului cilindrului', frequency: 160 },
        { description: 'Verificați distanța dintre lamele căruciorului și cele ale traversei: trebuie să fie de aprox 3mm', frequency: 160 },
        { description: 'Verificați strângerea cârligelor de răsucire a sârmei.', frequency: 160 },
        { description: 'Asigurați-vă că lamele de tăiere a sârmei taie corect, altfel ajustați cele două suporturi ale lamelor folosind cele trei șuruburi de ajustare.', frequency: 160 },
        { description: 'Verificare rolele de ghidare laterale si verticale ale căruciorului se rotesc liber fără blocaje', frequency: 160 },
        { description: 'Inlocuirea uleiului hidraulic', frequency: 2000 },
    ],
    'Conveior': CONVEYOR_LIKE_PREVENTIVE_TASKS,
    'Separator Metale': CONVEYOR_LIKE_PREVENTIVE_TASKS,
    'Separator Neferoase': CONVEYOR_LIKE_PREVENTIVE_TASKS,
    'Desfacator de Saci': [
        { description: 'Verificati varfurile filetate si ghidajele', frequency: 24 },
        { description: 'Ungeti rotile pe ambele parti ale camelor. In functie de natura materialului de alimentare, rotile trebuies lubrifriate la fiecare 40 pana la 120 ore de lucru', frequency: 24 },
        { description: 'Inspectia vizuala a rotorului', frequency: 40 },
        { description: 'Curatirea rotorului', frequency: 500 },
        { description: 'Verificati controlul initierii vitezei rotorului', frequency: 40 },
        { description: 'Verificati nivelul de ulei din cuplaj SEW', frequency: 24 },
        { description: 'Verificati scurgerile motoreductorului', frequency: 24 },
        { description: 'Verificati turbo ambreiajul la scurgeri', frequency: 24 },
        { description: 'Verificati atasamentele pieptenului sa nu fie deteriorate', frequency: 24 },
        { description: 'Verificati uzura si deteriorarea cilindrilor', frequency: 12 },
        { description: 'Verificati etanseitatea sistemului hidraulic', frequency: 12 },
        { description: 'Verificati nivelul uleiului la vizorul transparent al agregatului', frequency: 12 },
        { description: 'Verificati uzura si ruperea cutitelor pieptenului', frequency: 24 },
    ],
    'Sortator Optic': [
        { description: 'Verificați funcționarea corectă a circuitului de siguranță', frequency: 40 },
        { description: 'Verificaţi şi, dacă este necesar,strangeti racordurile filetate', frequency: 960 },
        { description: 'Verificati conexiunile electrice', frequency: 960 },
        { description: 'Efectuati insepctia vizuala a protectiei impotriva uzurii', frequency: 960 },
        { description: 'Indepartati acumularile de materiale si alte reziduuri', frequency: 24 },
        { description: 'Verificati senzorii usilor de protectie', frequency: 960 },
        { description: 'Verificati ecranul cu privire la orice mesaje de eroare.', frequency: 24 },
        { description: 'Curatati ecranul tactil', frequency: 160 },
        { description: 'Curatati schimbatorul de caldura daca este necesar', frequency: 40 },
        { description: 'Efectuati insepctia vizuala a schimbatorului de caldura', frequency: 40 },
        { description: 'Indepartati praful si murdaria de pe geamurile scanerului', frequency: 24 },
        { description: 'Verificati starea lampilor cu halogen.', frequency: 40 },
        { description: 'Verificati starea modulelor Deep LAISER. Inlocuiti modulele defecte', frequency: 40 },
        { description: 'Inspectati capacul senzorului EM', frequency: 960 },
        { description: 'Verificati functia de reglare a inaltimii senzor EM', frequency: 960 },
        { description: 'Efectuati o testare a supapelor', frequency: 40 },
        { description: 'Curatati duzele', frequency: 160 },
        { description: 'Verificati presinea aerului', frequency: 24 },
        { description: 'Indepartati reziduurile de pe unitatile pneumatice', frequency: 40 },
        { description: 'Goliti apa din rezervor', frequency: 160 },
        { description: 'Inlocuiti filtrul de aer', frequency: 480 },
        { description: 'Indepartati reziduurile la sistemul de pozitionare a blocului de valve', frequency: 160 },
        { description: 'Efectuati o inspectie vizuala la sistemul de pozitionare a blocului de valve', frequency: 480 },
        { description: 'Masurati viteza benzii', frequency: 160 },
        { description: 'Calibrare VIS', frequency: 480 },
        { description: 'Calibrare NIR', frequency: 960 },
        { description: 'Calibrare DLA', frequency: 960 },
        { description: 'Calibrare EM', frequency: 480 },
    ],
};

export const getPreventiveTasksForEquipment = (equipment: Equipment): PreventiveTask[] => {
    const lowerCaseName = equipment.name.toLowerCase();

    // Specific balers by name
    if (lowerCaseName.includes('hsm')) return PREVENTIVE_TASKS['Presa de Balotat HSM'] || [];
    if (lowerCaseName.includes('mac107')) return PREVENTIVE_TASKS['Presa de Balotat MAC107'] || [];
    
    // General types
    switch (equipment.equipmentType) {
        case 'Conveior': return PREVENTIVE_TASKS['Conveior'] || [];
        case 'Separator Balistic': return PREVENTIVE_TASKS['Separator Balistic'] || [];
        case 'Desfacator de Saci': return PREVENTIVE_TASKS['Desfacator de Saci'] || [];
        case 'Sortator Optic': return PREVENTIVE_TASKS['Sortator Optic'] || [];
        case 'Separator Metale': return PREVENTIVE_TASKS['Separator Metale'] || [];
        case 'Separator Neferoase': return PREVENTIVE_TASKS['Separator Neferoase'] || [];
        default: return [];
    }
};


export const initializeEquipment = (line: 1 | 2): Equipment[] => {
  const names = line === 1 ? EQUIPMENT_LINE_1_NAMES : EQUIPMENT_LINE_2_NAMES;
  return names.map(name => ({
    id: `${line}-${name.replace(/[^a-zA-Z0-9]/g, '-')}`,
    name,
    line,
    equipmentType: getEquipmentTypeFromName(name),
    nonConformities: [],
    completedMaintenanceTasks: [],
    operatingHours: 0,
  }));
};

export const evaluationLevels: EvaluationLevel[] = ['Nesatisfacator', 'Satisfacator', 'Bun'];