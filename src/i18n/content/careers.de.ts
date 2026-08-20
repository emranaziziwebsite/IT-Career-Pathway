import { CareerTranslation } from "./types";

export const careersDe: Record<string, CareerTranslation> = {
  "frontend-developer": {
    name: "Frontend-Entwickler",
    tagline: "Baue die Oberflächen, die Menschen wirklich berühren.",
    description:
      "Frontend-Entwickler verwandeln Designs in schnelle, zugängliche, interaktive Erlebnisse im Browser — das sichtbare Gesicht jedes Produkts.",
    specializations: ["Design-System-Ingenieur", "Webperformance-Spezialist", "Barrierefreiheits-Spezialist"],
    projects: ["Persönliches Portfolio", "Online-Shop", "Echtzeit-Dashboard"],
    labs: ["Baue die Landingpage eines echten Produkts pixelgenau nach", "Lighthouse-Performance-Audit-Labor"],
  },
  "backend-developer": {
    name: "Backend-Entwickler",
    tagline: "Baue die Motoren, die alles im Hintergrund antreiben.",
    description:
      "Backend-Entwickler entwerfen die Server, APIs und Datenbanken, die Daten speichern, Regeln durchsetzen und Anwendungen zuverlässig skalieren lassen.",
    specializations: ["API-Plattform-Ingenieur", "Datenbank-fokussierter Backend-Ingenieur", "Verteilte-Systeme-Ingenieur"],
    projects: ["REST-API mit Authentifizierung", "Echtzeit-Chat-Backend", "Backend mit Zahlungsanbindung"],
    labs: ["Entwirf einen Rate-Limiter", "Lasttest einer API durchführen und Engpässe beheben"],
  },
  "fullstack-developer": {
    name: "Full-Stack-Entwickler",
    tagline: "Eine Person, das ganze Produkt.",
    description:
      "Full-Stack-Entwickler bewegen sich mühelos zwischen Frontend und Backend — sie bauen ein komplettes Produkt von Anfang bis Ende.",
    specializations: ["Product Engineer", "Startup-Generalist", "Technischer Gründer"],
    projects: ["Full-Stack-Blog mit Login", "SaaS-Landingpage mit Dashboard", "Online-Shop"],
    labs: ["Baue an einem Wochenende eine komplette App von der Idee bis zur Live-URL"],
  },
  "software-engineer": {
    name: "Software-Ingenieur",
    tagline: "Löse schwierige Probleme mit sauber konstruierter Software, auf jeder Ebene.",
    description:
      "Software-Ingenieure setzen auf starke Grundlagen — Algorithmen, Architektur und Entwicklungspraxis — anwendbar auf Web, Systeme oder Plattformen.",
    specializations: ["Platform Engineer", "Systemingenieur", "Engineering-Generalist"],
    projects: ["Open-Source-Beitrag", "Eigenes CLI-Entwicklertool", "Skalierbarer Backend-Dienst"],
    labs: ["Implementiere eine Hash-Map von Grund auf", "Baue einen Mini-Interpreter"],
  },
  "mobile-developer": {
    name: "Mobile-Entwickler",
    tagline: "Baue die Apps, die Menschen in der Tasche tragen.",
    description:
      "Mobile-Entwickler bauen native oder plattformübergreifende Apps für iOS und Android — Performance, Plattformkonventionen und Offline-Fähigkeit im Blick.",
    specializations: ["iOS-Spezialist", "Android-Spezialist", "Cross-Platform-Ingenieur"],
    projects: ["Plattformübergreifender Gewohnheits-Tracker", "Native iOS-Notiz-App", "Android-App mit Room-Datenbank"],
    labs: ["Veröffentliche eine echte App im TestFlight oder Google Play internen Test"],
  },
  "ai-engineer": {
    name: "KI-Ingenieur",
    tagline: "Baue die intelligenten Systeme, die gerade jeder ausliefern will.",
    description:
      "KI-Ingenieure entwerfen, trainieren und veröffentlichen Machine-Learning- und Deep-Learning-Systeme — von klassischen ML-Modellen bis zu modernen LLM-Anwendungen.",
    specializations: ["ML-Ingenieur", "NLP/LLM-Ingenieur", "Computer-Vision-Ingenieur", "MLOps-Ingenieur"],
    projects: ["RAG-gestützte Dokumenten-Fragen", "Eigener Bildklassifikator", "KI-Agent mit Tool-Nutzung"],
    labs: ["Kaggle-Wettbewerb", "Ein Open-Source-LLM auf einem eigenen Datensatz feintunen"],
  },
  "data-scientist": {
    name: "Data Scientist",
    tagline: "Verwandle Rohdaten in Entscheidungen, die zählen.",
    description:
      "Data Scientists erforschen, modellieren und kommunizieren Erkenntnisse aus Daten — eine Mischung aus Statistik, Programmierung und Geschäftskontext.",
    specializations: ["Business-/Analytics-Data-Scientist", "Angewandter ML-Wissenschaftler", "Forschungswissenschaftler"],
    projects: ["Kündigungsvorhersage-Modell", "Interaktives Verkaufs-Dashboard", "A/B-Test-Analysebericht"],
    labs: ["Kaggle-Wettbewerb", "Eine veröffentlichte Datenanalyse-Studie nachbauen"],
  },
  "data-engineer": {
    name: "Data Engineer",
    tagline: "Baue die Pipelines, die Daten zuverlässig im großen Maßstab fließen lassen.",
    description:
      "Data Engineers entwerfen die Infrastruktur und Pipelines, die Daten bewegen, bereinigen und speichern, damit sich Analysten, Wissenschaftler und Anwendungen darauf verlassen können.",
    specializations: ["Analytics Engineer", "Big-Data-Ingenieur", "Data-Platform-Ingenieur"],
    projects: ["Automatisierte ETL-Pipeline", "Analytics-Warehouse für ein Beispielunternehmen", "Echtzeit-Streaming-Dashboard"],
    labs: ["Baue eine Pipeline, die einen Schema-Wechsel übersteht", "Ein Jahr historischer Daten korrekt nachladen"],
  },
  "database-engineer": {
    name: "Datenbank-Ingenieur",
    tagline: "Sorge dafür, dass Daten schnell, korrekt und nie verloren sind.",
    description:
      "Datenbank-Ingenieure entwerfen Schemas, optimieren Performance und halten die Systeme am Laufen, auf die sich jede Anwendung letztlich verlässt.",
    specializations: ["Datenbankadministrator (DBA)", "Database Reliability Engineer", "Data-Platform-Architekt"],
    projects: ["Normalisiertes Schema für ein echtes Unternehmen", "Replizierter & gesicherter Datenbank-Aufbau", "Single-Table-NoSQL-Design"],
    labs: ["Diagnostiziere und behebe eine langsame Abfrage in einer großen Tabelle", "Simuliere und erhole dich von einem Datenbankausfall"],
  },
  "cybersecurity-analyst": {
    name: "Cybersecurity-Analyst",
    tagline: "Verteidige Systeme, jage Bedrohungen und bleib Angreifern einen Schritt voraus.",
    description:
      "Cybersecurity-Analysten schützen Organisationen, indem sie Schwachstellen finden, Bedrohungen überwachen und auf Vorfälle reagieren, bevor echter Schaden entsteht.",
    specializations: ["SOC-Analyst", "Penetrationstester", "Digitalforensik-Ermittler", "Security Engineer"],
    projects: ["Heimlabor mit Firewall/IDS", "Vollständiges CTF-Portfolio", "Incident-Response-Leitfaden"],
    labs: ["TryHackMe", "HackTheBox", "Heim-SOC-Labor mit SIEM-Sandbox"],
    projectGroups: {
      "labs-1": {
        label: "Praxislabore",
        projects: [
          "TryHackMe-Einsteigerpfad",
          "HackTheBox-Einstiegsmaschinen",
          "Baue ein Heim-Sicherheitslabor mit Firewall + IDS",
        ],
      },
    },
  },
  "network-engineer": {
    name: "Netzwerk-Ingenieur",
    tagline: "Halte die Daten der Welt zuverlässig von A nach B fließend.",
    description:
      "Netzwerk-Ingenieure entwerfen, bauen und warten die Router, Switches und Verbindungen, über die Geräte und Rechenzentren miteinander sprechen.",
    specializations: ["WLAN-Netzwerk-Ingenieur", "Netzwerksicherheits-Ingenieur", "Cloud-Netzwerk-Architekt"],
    projects: ["Multi-VLAN-Bürodesign", "Site-to-Site-VPN-Labor", "Automatisierte Netzwerkkonfiguration mit Ansible"],
    labs: ["Packet-Tracer-Topologien", "GNS3-Unternehmensnetzwerk-Simulation", "Heimlabor mit echten Switches/Routern"],
    projectGroups: {
      "wireless-1": {
        label: "WLAN-Netzwerke",
        projects: [
          "Wi-Fi-Standards (802.11 a/b/g/n/ac/ax)",
          "Standortanalysen & Kanalplanung",
          "Enterprise-WLAN-Sicherheit (WPA2/WPA3, 802.1X)",
        ],
      },
    },
  },
  "system-administrator": {
    name: "Systemadministrator",
    tagline: "Halte Server, Nutzer und Infrastruktur jeden einzelnen Tag am Laufen.",
    description:
      "Systemadministratoren verwalten Server, Konten und Infrastruktur — die Menschen, die alles am Laufen halten, damit andere darauf aufbauen können.",
    specializations: ["Linux-Systemadministrator", "Windows-Systemadministrator", "IT-Infrastrukturmanager"],
    projects: ["Automatisierte Server-Bereitstellung", "Zentrales Monitoring-Dashboard", "Gehärteter Multi-User-Linux-Server"],
    labs: ["Heimlabor mit mehreren VMs", "Simulierte Ransomware-Wiederherstellungsübung"],
  },
  "cloud-engineer": {
    name: "Cloud-Ingenieur",
    tagline: "Entwirf Infrastruktur, die auf Abruf auf Millionen skaliert.",
    description:
      "Cloud-Ingenieure entwerfen, veröffentlichen und verwalten Infrastruktur auf Plattformen wie AWS, Azure und GCP — im Gleichgewicht zwischen Skalierbarkeit, Kosten und Zuverlässigkeit.",
    specializations: ["Cloud-Architekt", "Site Reliability Engineer", "FinOps-/Kosten-Ingenieur"],
    projects: ["Auto-skalierende Webanwendung", "Serverlose API", "Multi-Region-Architekturdesign"],
    labs: ["Multi-Cloud-Kostenvergleichslabor", "Notfallwiederherstellungs-Simulation"],
  },
  "devops-engineer": {
    name: "DevOps-Ingenieur",
    tagline: "Verbinde Entwicklung und Betrieb, damit Software schnell und sicher ausgeliefert wird.",
    description:
      "DevOps-Ingenieure bauen die Pipelines, Automatisierung und das Monitoring, mit denen Teams schnell Code ausliefern, ohne die Produktion zu gefährden.",
    specializations: ["Site Reliability Engineer", "Platform Engineer", "Release Engineer"],
    projects: ["Vollständige CI/CD-Pipeline", "Selbstheilendes Kubernetes-Deployment", "Infrastructure-as-Code-Mehrumgebungs-Setup"],
    labs: ["Brich einen produktionsähnlichen Cluster und repariere ihn", "Chaos-Engineering-Übung"],
  },
  "game-developer": {
    name: "Spieleentwickler",
    tagline: "Baue Welten, in denen sich Menschen verlieren wollen.",
    description:
      "Spieleentwickler kombinieren Programmierung, Mathematik und Kreativität, um die Mechaniken, Systeme und Erlebnisse zu bauen, die Spiele Spaß machen lassen.",
    specializations: ["Gameplay-Programmierer", "Technical Artist", "Spiel-KI-Programmierer", "Multiplayer-/Netcode-Ingenieur"],
    projects: ["2D-Plattformer mit vollständigen Leveln", "3D-Action-Prototyp", "Multiplayer-Minispiel"],
    labs: ["Game Jam (48-Stunden-Build)", "Baue ein klassisches Arcade-Spiel nach"],
  },
  "ar-vr-developer": {
    name: "AR/VR-Entwickler",
    tagline: "Baue Erlebnisse, die digitale und physische Welt verschmelzen lassen.",
    description:
      "AR/VR-Entwickler erschaffen immersive räumliche Erlebnisse für Headsets und mobile Geräte — von Trainingssimulationen bis zu Spielen und Produktvisualisierung.",
    specializations: ["VR-Erlebnisdesigner", "AR-Anwendungsentwickler", "Spatial-Computing-Ingenieur"],
    projects: ["AR-Produktvisualisierer", "VR-Trainingsmodul", "Handverfolgungs-Interaktionsdemo"],
    labs: ["Für ein echtes Headset entwickeln (Quest/Vision Pro), falls verfügbar", "AR-Prototyp auf einem Handy testen"],
  },
  "robotics-engineer": {
    name: "Robotik-Ingenieur",
    tagline: "Erwecke Maschinen zum Leben, die fühlen, denken und sich bewegen.",
    description:
      "Robotik-Ingenieure verbinden Maschinenbau, Elektrotechnik und Softwareentwicklung, um Maschinen zu bauen, die die physische Welt wahrnehmen und mit ihr interagieren.",
    specializations: ["Robotik-Softwareingenieur", "Mechatronik-Ingenieur", "Wahrnehmungs-Ingenieur"],
    projects: ["Autonomer linienfolgender Roboter", "Roboterarm-Demo", "SLAM-basierter Navigationsroboter"],
    labs: ["The-Construct-Online-ROS-Labore", "Lokaler Robotik-Club/Wettbewerb"],
    projectGroups: {
      "labs-1": {
        label: "Robotik-Labore",
        projects: [
          "Linienfolgender Roboter",
          "Simulierter Roboter, der ein Labyrinth durchquert (Gazebo)",
          "Roboterarm-Aufnehmen-und-Platzieren-Demo",
        ],
      },
    },
  },
  "embedded-developer": {
    name: "Embedded-Entwickler",
    tagline: "Schreibe die Software, die in der Hardware um dich herum steckt.",
    description:
      "Embedded-Entwickler schreiben systemnahe Software, die direkt auf Mikrocontrollern und Spezialhardware läuft — von Haushaltsgeräten bis zu Medizingeräten.",
    specializations: ["Firmware-Ingenieur", "IoT-Entwickler", "Echtzeitsysteme-Ingenieur"],
    projects: ["Sensor-Logging-Gerät", "Batteriebetriebener IoT-Sensor", "FreeRTOS-Multitasking-System"],
    labs: ["Baue ein eigenes PCB-basiertes Projekt", "Reverse-Engineere die Firmware eines einfachen Embedded-Geräts"],
  },
  "ui-ux-designer": {
    name: "UI/UX-Designer",
    tagline: "Gestalte Produkte, die Menschen wirklich gerne nutzen.",
    description:
      "UI/UX-Designer erforschen Nutzerbedürfnisse und gestalten die Abläufe, Layouts und Visuals, die digitale Produkte intuitiv, nutzbar und angenehm machen.",
    specializations: ["Product Designer", "UX-Researcher", "Design-System-Designer"],
    projects: ["Mobile-App-Redesign-Fallstudie", "Mini-Designsystem", "Barrierefreiheits-Audit + Behebung für eine echte Seite"],
    labs: ["Redesign-Herausforderung für eine bekannte App", "Usability-Test mit 5 echten Nutzern"],
  },
  "qa-engineer": {
    name: "QA-Ingenieur",
    tagline: "Zerbrich Dinge absichtlich, damit Nutzer es nie müssen.",
    description:
      "QA-Ingenieure entwerfen und führen Tests durch — manuell und automatisiert —, um Fehler zu finden, bevor sie Nutzer erreichen, und Teams sicheres Ausliefern zu ermöglichen.",
    specializations: ["Testautomatisierungs-Ingenieur", "Performance-Test-Ingenieur", "QA-Lead"],
    projects: ["Vollständiger Testplan + Fehlerberichte für eine App", "E2E-Automatisierungssuite", "API-Testautomatisierung mit CI-Integration"],
    labs: ["Bug-Bash bei einer Open-Source-App", "Baue eine Automatisierungssuite für eine Demo-App"],
  },
};
